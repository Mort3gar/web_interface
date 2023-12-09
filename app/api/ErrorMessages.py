from dataclasses import dataclass


@dataclass(frozen=True)
class BrandsAPIErrors:
    idErr: str = "Бренда с таким id не существует"
    nameUsedErr: str = "Бренд с таким названием уже существует"
    colValLenErr: str = "Кол-во изменяемых колонок и их значений должно быть одинаковым"

