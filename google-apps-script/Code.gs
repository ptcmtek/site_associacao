const SPREADSHEET_ID = '1tdGOuWtGssb3ETEKmhBhqjBRypOgVLzZPZ-s1BZeMPM';
const SHEET_NAME = 'Inscrições';
const SECRET_PROPERTY = 'WEBHOOK_SECRET';

function doGet() {
  return jsonResponse({ok: true, service: 'inscricoes-associacao-pais'});
}

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    validateSecret(event);
    const payload = JSON.parse(event.postData && event.postData.contents || '{}');
    const children = validatePayload(payload);

    lock.waitLock(10000);

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Folha "Inscrições" não encontrada.');

    const submittedAt = payload.submittedAt ? new Date(payload.submittedAt) : new Date();
    const row = [
      submittedAt,
      createMemberId(submittedAt),
      clean(payload.registrationType),
      clean(payload.fullName),
      clean(payload.email),
      clean(payload.phone),
    ];

    for (let index = 0; index < 5; index += 1) {
      const child = children[index];
      row.push(child ? clean(child.name) : '');
      row.push(child ? clean(child.className) : '');
    }

    row.push(payload.internalCommunication === true ? 'Sim' : 'Não');
    row.push('Recebida');
    row.push('');
    row.push(0);
    row.push('Não aplicável');
    row.push('');
    row.push('');
    row.push('');

    sheet.appendRow(row);
    return jsonResponse({ok: true, memberId: row[1]});
  } catch (error) {
    console.error(error);
    return jsonResponse({ok: false, error: error.message || 'Erro interno.'});
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function validateSecret(event) {
  const expected = PropertiesService.getScriptProperties().getProperty(SECRET_PROPERTY);
  const received = event && event.parameter && event.parameter.token;
  if (!expected) throw new Error('Webhook ainda não configurado.');
  if (!received || received !== expected) throw new Error('Pedido não autorizado.');
}

function validatePayload(payload) {
  const required = ['registrationType', 'fullName', 'email', 'phone'];
  if (required.some(function (field) { return !clean(payload[field]); })) {
    throw new Error('Faltam dados obrigatórios.');
  }

  const children = Array.isArray(payload.children) ? payload.children.slice(0, 5) : [];
  if (children.length < 1 || children.some(function (child) {
    return !child || !clean(child.name) || !clean(child.className);
  })) {
    throw new Error('Os dados dos filhos são inválidos.');
  }

  return children;
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function createMemberId(date) {
  const stamp = Utilities.formatDate(date, 'Europe/Lisbon', 'yyyyMMdd-HHmmss');
  const suffix = Utilities.getUuid().slice(0, 4).toUpperCase();
  return 'SOC-' + stamp + '-' + suffix;
}

function jsonResponse(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}

function setupWebhookSecret() {
  const secret = Utilities.getUuid() + Utilities.getUuid();
  PropertiesService.getScriptProperties().setProperty(SECRET_PROPERTY, secret);
  console.log('WEBHOOK_SECRET=' + secret);
  return secret;
}
