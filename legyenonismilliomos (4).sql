-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Máj 22. 06:32
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `legyenonismilliomos`
--
CREATE DATABASE IF NOT EXISTS `legyenonismilliomos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `legyenonismilliomos`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `csoportok`
--

CREATE TABLE `csoportok` (
  `id` int(11) NOT NULL,
  `csoportnev` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `tanar` varchar(50) NOT NULL,
  `felhasznalokid` int(11) NOT NULL,
  `kerdesekid` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` int(1) NOT NULL,
  `nev` varchar(50) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(50) NOT NULL,
  `tanar` tinyint(1) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `nev`, `password`, `email`, `tanar`, `admin`) VALUES
(1, 'szabo.emanuel', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'nincs', 0, 1),
(2, 'emodi.tibor', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'nincs', 0, 1),
(3, 'szarvas', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'tanar@gmail.com', 1, 0),
(4, 'majom', 'b493d48364afe44d11c0165cf470a4164d1e2609911ef998be868d46ade3de4e', 'majom@majom.com', 1, 0),
(5, 'kecske', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'kecske@sajt.com', 1, 0),
(6, 'alma2', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'alma@alma2.com', 0, 0);

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
  `hozaado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `kerdesek`
--

INSERT INTO `kerdesek` (`id`, `kerdes`, `tema`, `helyesvalasz`, `elsovalasz`, `masodikvalasz`, `harmadikvalasz`, `negyedikvalasz`, `hozaado`) VALUES
(1, 'Mi az informatika alapvető egysége, amely két állapotot vehet fel, általában 0 és 1 értékeket jelentve?', 'Informatika', 1, 'Bit', 'Byte', 'Megabyte', 'Gigabyte', 3),
(2, 'Melyik számrendszer használja a számokat 0-tól 7-ig, és gyakran alkalmazzák a számítógépekben a bitek reprezentálására?', 'informatika', 2, 'Bináris', 'Oktális', 'Decimális', 'Hexadecimális', 2),
(3, 'Ki írta az \"Egri csillagok\" című regényt, amely Magyarország egyik legismertebb irodalmi alkotása?', 'irodalom', 3, 'Móricz Zsigmond', 'Krúdy Gyula', 'Gárdonyi Géza', 'Jókai Mór', 2),
(4, 'Melyik erdélyi születésű magyar író hagyott hátra rendkívül gazdag irodalmi örökséget, munkásságában gyakran foglalkozott a magyar és erdélyi tájjal, valamint a magyar történelemmel és néprajzzal?\n\n', 'Irodalom', 2, 'Kosztolányi Dezső', 'Wass Albert', 'Krúdy Gyula', 'Jókai Mór', 3),
(5, 'A Beatles-együttes melyik tagja viselt szemüveget?', 'Zene', 1, 'John Lennon', 'Paul McCartney', 'George Harrison', 'Ringo Starr', 2),
(6, 'A Biblia szerint hány éves volt Sára, amikor megszülte Izsákot?', 'Biblia', 2, '75', '90', '120', '333', 2),
(7, 'A Biblia szerint hány nap alatt teremtette az Úr a világot?', 'Biblia', 3, 'tíz', 'hat', 'hét', 'három', 3),
(8, 'A Biblia szerint hova került József, miután testvérei eladták?', 'Biblia', 4, 'Föníciába', 'Szíriába', 'Perzsiába', 'Egyiptomba', 2),
(9, 'A Biblia szerint ki mosta kezeit Jézus elítélésekor?', 'Biblia', 1, 'Pontius Pilátus', 'Kajafás', 'Júdás', 'Heródes', 3),
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
(23, 'A felsoroltak közül ki nem volt pénzügyminiszter?', 'Történelem', 3, 'Bokros Lajos', 'Rabár Ferenc', 'Surányi György', 'Medgyessy Péter', 3),
(24, 'Az alábbi hozzávalók közül melyik nem kell a borscsba?', 'Gasztronómia', 1, 'uborka', 'cékla', 'káposzta', 'paradicsom', 2),
(25, 'Hány éves évforduló a centenárium?', 'Matematika', 4, 'tíz', 'húsz', 'ötven', 'száz', 2),
(26, 'Hogy hívják a főhős szolgálóját Vörösmarty Mihály Csongor és Tündéjében?', 'Irodalom', 1, 'Balga', 'Bamba', 'Sete', 'Suta', 2),
(27, 'Hogyan nevezik, amikor egy állatfaj két egyede harc nélkül dönt valamelyikük elsőbbségéről?', 'Biológia', 4, 'paktum', 'blöffölés', 'snúrozás', 'pózolás', 2),
(28, 'A felsoroltak közül ki nem barokk zeneszerző?', 'Zene', 2, 'Vivaldi', 'Grieg', 'J. S. Bach', 'Purcell', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kodok`
--

CREATE TABLE `kodok` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) NOT NULL,
  `idokorlat` int(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `kodok`
--

INSERT INTO `kodok` (`id`, `nev`, `idokorlat`) VALUES
(1, 'tanar0', NULL),
(2, 'alma', 2026),
(3, 'asztal', 2000),
(4, 'a', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `toplista`
--

CREATE TABLE `toplista` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) NOT NULL,
  `pont` int(30) NOT NULL,
  `felhasznalokid` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `csoportok`
--
ALTER TABLE `csoportok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_felhasznalokid` (`felhasznalokid`),
  ADD KEY `kerdesekid` (`kerdesekid`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kerdesek`
--
ALTER TABLE `kerdesek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_hozaado` (`hozaado`);

--
-- A tábla indexei `kodok`
--
ALTER TABLE `kodok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `toplista`
--
ALTER TABLE `toplista`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalokid` (`felhasznalokid`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `csoportok`
--
ALTER TABLE `csoportok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `kerdesek`
--
ALTER TABLE `kerdesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT a táblához `kodok`
--
ALTER TABLE `kodok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `toplista`
--
ALTER TABLE `toplista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `csoportok`
--
ALTER TABLE `csoportok`
  ADD CONSTRAINT `FK_felhasznalokid` FOREIGN KEY (`felhasznalokid`) REFERENCES `felhasznalok` (`id`),
  ADD CONSTRAINT `csoportok_ibfk_1` FOREIGN KEY (`kerdesekid`) REFERENCES `kerdesek` (`id`);

--
-- Megkötések a táblához `kerdesek`
--
ALTER TABLE `kerdesek`
  ADD CONSTRAINT `fk_hozaado` FOREIGN KEY (`hozaado`) REFERENCES `felhasznalok` (`id`);

--
-- Megkötések a táblához `toplista`
--
ALTER TABLE `toplista`
  ADD CONSTRAINT `toplista_ibfk_1` FOREIGN KEY (`felhasznalokid`) REFERENCES `felhasznalok` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
