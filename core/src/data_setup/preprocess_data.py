import re


def remove_special_chars(s):
    return re.sub(r"[^\w\s]", "", s).replace("\t", "")


def replace_multiline_break_with_single(s):
    return re.sub(r"\n+", "\n", s).strip()


def add_predmet_ime_u_tekst(predmet, tekst):
    rezultat = ""
    x = 500

    while x < len(tekst):
        closest_newline_index = tekst.rfind("\n", 0, x)
        if closest_newline_index == -1:
            x += x
            continue

        rezultat += tekst[: closest_newline_index + 1]
        rezultat += f"\nОвие информации се за предметот {predmet}\n"
        tekst = tekst[closest_newline_index + 1 :]
        x += 5

    rezultat += tekst
    return rezultat


# ------------------- MAIN ------------------- #
def process_data():
    print("Start processing")
    x = None
    with open("src/data/raw//ПРЕДМЕТНИК.md", "r", encoding="UTF-8") as file:
        x = file.read()

    # ovoa brise tie dlgite linkovi za sliki so se
    x = re.sub(r"\[image\d+\]: <data.+?>", "", x)

    predmeti = x.split("##")

    i = 0
    for predmet in predmeti:
        i += 1
        predmet = replace_multiline_break_with_single(remove_special_chars(predmet))
        filename = predmet.split("\n")[0]

        if "http" in filename or "www" in filename:
            filename = filename.split("http")[0]

        predmet = predmet.split("\n")[1:]
        predmet.insert(0, f"Овие информации се за предметот {filename}")
        predmet = "\n".join(predmet)

        predmet = add_predmet_ime_u_tekst(filename, predmet)

        if len(filename) == 0 or len(filename) > 100:
            continue

        with open(
            f"src/data/processed/predmetnik/{filename}.txt", "w", encoding="UTF-8"
        ) as f:
            f.write(predmet)
            print(f"Predmeti procesirani: {i}")
