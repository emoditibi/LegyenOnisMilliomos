-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Máj 13. 11:20
-- Kiszolgáló verziója: 10.4.20-MariaDB
-- PHP verzió: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `legyenonismilliomos2`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kerdesek`
--

CREATE TABLE `kerdesek` (
  `id` int(11) NOT NULL,
  `kerdes` varchar(300) NOT NULL,
  `tema` varchar(50) NOT NULL,
  `helyesvalasz` int(1) NOT NULL,
  `elsovalasz` varchar(50) NOT NULL,
  `masodikvalasz` varchar(50) NOT NULL,
  `harmadikvalasz` varchar(50) NOT NULL,
  `negyedikvalasz` varchar(50) NOT NULL,
  `hozaado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `kerdesek`
--

INSERT INTO `kerdesek` (`id`, `kerdes`, `tema`, `helyesvalasz`, `elsovalasz`, `masodikvalasz`, `harmadikvalasz`, `negyedikvalasz`, `hozaado`) VALUES
(0, 'A felsoroltak közül ki nem barokk zeneszerző?', 'Zene', 2, 'Vivaldi', 'Grieg', 'J. S. Bach', 'Purcell', 7),
(1, 'Mi az informatika alapvető egysége, amely két állapotot vehet fel, általában 0 és 1 értékeket jelentve?', 'informatika', 1, 'Bit', 'Byte', 'Megabyte', 'Gigabyte', 2),
(2, 'Melyik számrendszer használja a számokat 0-tól 7-ig, és gyakran alkalmazzák a számítógépekben a bitek reprezentálására?', 'informatika', 2, 'Bináris', 'Oktális', 'Decimális', 'Hexadecimális', 2),
(3, 'Ki írta az \"Egri csillagok\" című regényt, amely Magyarország egyik legismertebb irodalmi alkotása?', 'irodalom', 3, 'Móricz Zsigmond', 'Krúdy Gyula', 'Gárdonyi Géza', 'Jókai Mór', 2),
(4, 'Melyik erdélyi születésű magyar író hagyott hátra rendkívül gazdag irodalmi örökséget, munkásságában gyakran foglalkozott a magyar és erdélyi tájjal, valamint a magyar történelemmel és néprajzzal?\n\n', 'irodalom', 2, 'Kosztolányi Dezső', 'Wass Albert', 'Krúdy Gyula', 'Jókai Mór', 2),
(5, 'A Beatles-együttes melyik tagja viselt szemüveget?', 'Zene', 1, 'John Lennon', 'Paul McCartney', 'George Harrison', 'Ringo Starr', 2),
(6, 'A Biblia szerint hány éves volt Sára, amikor megszülte Izsákot?', 'Biblia', 2, '75', '90', '120', '333', 2),
(7, 'A Biblia szerint hány nap alatt teremtette az Úr a világot?', 'Biblia', 3, 'tíz', 'hat', 'hét', 'három', 2),
(8, 'A Biblia szerint hova került József, miután testvérei eladták?', 'Biblia', 4, 'Föníciába', 'Szíriába', 'Perzsiába', 'Egyiptomba', 2),
(9, 'A Biblia szerint ki mosta kezeit Jézus elítélésekor?', 'Biblia', 1, 'Pontius Pilátus', 'Kajafás', 'Júdás', 'Heródes', 2),
(10, 'A Biblia szerint ki vezette a zsidó népet az Ígéret földjére Mózes halála után?', 'Biblia', 1, 'Józsué', 'Áron', 'Dávid', 'Jákob', 2),
(11, 'A Biblia szerint kit akart Ábrahám feláldozni?', 'Biblia', 4, 'Ézsaut', 'Jákobot', 'Illést', 'Izsákot', 2),
(12, 'A Biblia szerint kit jelölt ki az Úr, hogy szabadítsa ki Izrael népét az egyiptomi fogságból?', 'Biblia', 3, 'Ábrahámot', 'Dávidot', 'Mózest', 'Jézust', 2),
(13, 'A Biblia szerint milyen állat állkapcsával ütött agyon Sámson ezer filiszteust?', 'Biblia', 2, 'kecske', 'szamár', 'oroszlán', 'borjú', 2),
(14, 'A borjú melyik bontási részéből vásárol, aki frikandót vesz?', 'Gasztronómia', 4, 'gerinc', 'szegy', 'lapocka', 'comb', 2),
(15, 'A csicsóka melyik része ehető?', 'Gasztronómia', 3, 'a virágzata', 'a levele', 'a gyökérgumója', 'a magja', 2),
(16, 'A felsorolt európai államok közül melyik nem köztársaság?', 'Földrajz', 3, 'Szlovénia', 'Portugália', 'Hollandia', 'Írország', 2),
(17, 'A felsorolt német városok közül melyik nem az Elba partján fekszik?', 'Földrajz', 3, 'Hamburg', 'Wittenberg', 'Bréma', 'Drezda', 2),
(18, 'A felsorolt országok közül melyik nem az afrikai földrészen található?', 'Földrajz', 4, 'Szomália', 'Szudán', 'Szváziföld', 'Suriname', 2),
(19, 'A felsorolt országok közül melyik tagja a NATO-nak?', 'Földrajz', 1, 'Luxemburg', 'Svájc', 'Svédország', 'Ciprus', 2),
(20, 'A felsorolt országok közül melyik zászlaja nem négyszögletes?', 'Földrajz', 3, 'Marokkó', 'Chile', 'Nepál', 'San Marino', 2),
(21, 'A felsorolt országok közül melyik zászlajában nincs vörös szín?', 'Földrajz', 3, 'Ausztria', 'Kína', 'Izrael', 'Kanada', 2),
(22, 'A felsorolt országok közül melyiknek a zászlójában nincs csillag?', 'Földrajz', 4, 'Szíria', 'Vietnam', 'Törökország', 'Indonézia', 2),
(24, 'A felsoroltak közül ki nem volt pénzügyminiszter?', 'Politika', 3, 'Bokros Lajos', 'Rabár Ferenc', 'Surányi György', 'Medgyessy Péter', 2),
(25, 'Az alábbi hozzávalók közül melyik nem kell a borscsba?', 'Gasztronómia', 1, 'uborka', 'cékla', 'káposzta', 'paradicsom', 2),
(26, 'Hány éves évforduló a centenárium?', 'Matematika', 4, 'tíz', 'húsz', 'ötven', 'száz', 0),
(27, 'Hogy hívják a főhős szolgálóját Vörösmarty Mihály Csongor és Tündéjében?', 'Irodalom', 1, 'Balga', 'Bamba', 'Sete', 'Suta', 0),
(28, 'Hogyan nevezik, amikor egy állatfaj két egyede harc nélkül dönt valamelyikük elsőbbségéről?', 'tema', 4, 'paktum', 'blöffölés', 'snúrozás', 'pózolás', 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `kerdesek`
--
ALTER TABLE `kerdesek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_hozaado` (`hozaado`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `kerdesek`
--
ALTER TABLE `kerdesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `kerdesek`
--
ALTER TABLE `kerdesek`
  ADD CONSTRAINT `fk_hozaado` FOREIGN KEY (`hozaado`) REFERENCES `felhasznalok` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
