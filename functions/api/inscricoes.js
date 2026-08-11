const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {'Content-Type': 'application/json; charset=utf-8'},
});

export async function onRequestPost({request, env}) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({error: 'invalid_json'}, 400);
  }

  const children = Array.isArray(payload.children) ? payload.children : [];
  const required = [payload.registrationType, payload.fullName, payload.email, payload.phone];
  if (required.some((value) => typeof value !== 'string' || !value.trim())) {
    return json({error: 'missing_required_fields'}, 400);
  }
  const email = payload.email.trim();
  const phone = payload.phone.replace(/[\s()-]/g, '');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({error: 'invalid_email'}, 400);
  }
  if (!/^(?:\+351)?9\d{8}$/.test(phone)) {
    return json({error: 'invalid_phone'}, 400);
  }
  if (children.length < 1 || children.length > 5 || children.some((child) =>
    !child?.name?.trim() || !/^[1-9][ABC]$/.test(child?.className)
  )) {
    return json({error: 'invalid_children'}, 400);
  }
  if (!env.REGISTRATION_WEBHOOK_URL) {
    return json({error: 'registration_service_not_configured'}, 503);
  }

  const response = await fetch(env.REGISTRATION_WEBHOOK_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      ...payload,
      email,
      phone,
      submittedAt: new Date().toISOString(),
      children: children.slice(0, 5),
    }),
  });

  if (!response.ok) return json({error: 'registration_service_failed'}, 502);
  let result;
  try {
    result = await response.json();
  } catch {
    return json({error: 'invalid_registration_service_response'}, 502);
  }
  if (!result?.ok) return json({error: 'registration_service_rejected'}, 502);
  return json({ok: true, memberId: result.memberId});
}
