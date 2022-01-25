# Mock HIS Frame App
Ez az alkalmazás arra szolgál, hogy az iCell DEV környezeten előállítsa a Backend segítségével azt a JSON tokent, ami
az https://confluence.icellmobilsoft.hu/pages/viewpage.action?pageId=99548949 itt leírtak szerint a plugin működés
inicializáláshoz szükséges.

# Használat
- Legyünk fent VPN-en, és a`npm run start` segítségével indtsuk el (vagy elérhető az alábbi címen: <TBD>)
- Adjuk meg a `loginName`, `instituteId` és `departmentId` adatokat
- Adjuk meg a megfelelő `role`-t, JSON tömb-ként
- Opcionális: ha szeretnénk HIS előtöltést, akkor azt is
- A "JWT generálás" gomb megnyomása után alatta közvetlenü megkapjuk a generált JWT tokent, a linket amivel dev-en elindul az alkalmazás, 
vagy ha hibára futunk akkor az elküldött adatokat és a hibaleírást. 

