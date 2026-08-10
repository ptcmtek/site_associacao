import asyncio
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]

VOICEOVERS = {
    "pt": {
        "voice": "pt-PT-RaquelNeural",
        "rate": "+12%",
        "texts": {
            "opening": "Agrupamento de Escolas de Pardilhó. A escola também é nossa.",
            "children": "Todos queremos o melhor para os nossos filhos.",
            "purpose": "E é precisamente para isso que existe uma Associação de Pais: para dar voz aos pais e representá-los na comunidade escolar, ouvindo, questionando, propondo e ajudando a encontrar soluções.",
            "people": "Uma Associação cresce com a participação dos pais.",
            "member": "E tudo começa por ser sócio.",
            "time": "Não precisas de estar sempre presente. Participa quando e como puderes. Não tens de ir a todas as reuniões nem de assumir um cargo.",
            "rights": "Porque ser sócio é ter voz, é poder participar e, claro, é poder votar.",
            "lists": "E ser sócio é também saber que os novos sócios podem juntar-se, trazer novas ideias e até fazer parte de uma lista.",
            "stays": "Porque uma Associação não é apenas uma Direção: as Direções mudam, mas a Associação fica.",
            "strength": "E quanto mais sócios formos, mais forte será a voz dos pais.",
            "final": "Associa-te ou renova a tua inscrição e participa nas próximas Assembleias. Participa, vota e decide. A voz dos pais também conta.",
        },
    },
    "en": {
        "voice": "en-GB-SoniaNeural",
        "rate": "-3%",
        "texts": {
            "opening": "Pardilhó School Group. The school is ours too.",
            "children": "We all want the best for our children.",
            "purpose": "That’s exactly what a Parents’ Association is for: giving parents a voice and representing them in the school community, by listening, asking questions, sharing ideas and helping to find solutions.",
            "people": "An Association grows through parents' participation.",
            "member": "And it all starts with becoming a member.",
            "time": "You don't need to be there all the time. Take part when and how you can. You don't have to attend every meeting or take on a formal role.",
            "rights": "Because being a member means having a voice, being able to take part and, of course, being able to vote.",
            "lists": "Being a member also means knowing that new members can come together, bring new ideas and even be part of a candidate list.",
            "stays": "Because an Association is more than its Committee: Committees change, but the Association remains.",
            "strength": "And the more members we have, the stronger the parents' voice will be.",
            "final": "Join us or renew your membership and take part in the upcoming General Meetings. Take part, vote and decide. Parents' voices matter too.",
        },
    },
}


async def generate() -> None:
    requested_language = sys.argv[1] if len(sys.argv) > 1 else None
    requested_scene = sys.argv[2] if len(sys.argv) > 2 else None
    for language, config in VOICEOVERS.items():
        if requested_language and language != requested_language:
            continue
        output_dir = ROOT / "public" / "audio" / language
        output_dir.mkdir(parents=True, exist_ok=True)
        for scene_id, text in config["texts"].items():
            if requested_scene and scene_id != requested_scene:
                continue
            output = output_dir / f"{scene_id}.mp3"
            communicate = edge_tts.Communicate(
                text=text,
                voice=config["voice"],
                rate=config["rate"],
                volume="+0%",
                pitch="+0Hz",
            )
            await communicate.save(str(output))
            print(f"Generated {output.relative_to(ROOT)}")

    mixed_opening = [
        ("opening-name-pt.mp3", "Agrupamento de Escolas de Pardilhó.", "pt-PT-RaquelNeural", "+12%"),
        ("opening-rest-en.mp3", "The school is ours too.", "en-GB-SoniaNeural", "-3%"),
    ]
    for filename, text, voice, rate in mixed_opening:
        if requested_language not in (None, "en") or requested_scene not in (None, "opening"):
            continue
        output = ROOT / "public" / "audio" / "en" / filename
        await edge_tts.Communicate(text=text, voice=voice, rate=rate).save(str(output))
        print(f"Generated {output.relative_to(ROOT)}")


if __name__ == "__main__":
    asyncio.run(generate())
