let adminPassword = 'eeeyyy'; // HASŁO ADMINISTRATORA

// Podstawa RS: http://rshl.eu/pages.php?page=autoreferee
/***************************************************************************************************************************************************************************

Aby uzyskać uprawnienia administratora należy (domyślnie) wpisać !op R/. Zalecana jest zmiana hasła (linijka 1)

PRZYDATNE KOMENDY DLA ADMINÓW:

!tred <nazwa>: Ustawia nazwę drużyny czerwonych. Domyślnie jest pusta. Będzie wyświetlana, gdy bot wskaże wykonawcę stałego fragmentu gry np. "Rzut rożny dla [🔴R] <nazwa>"
!tblue <nazwa>: Jak wyżej, tylko dla niebieskich.
!load rs: Mapa RS
!load pens rs: Mapa do rzutów karnych

Sędzia określa, co ma się stać, gdy piłka wyjdzie za boisko oraz zapisuje strzelców i asysty

***************************************************************************************************************************************************************************/

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||"undefined"!==typeof navigator&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator)||function(a){"use strict";if("undefined"===typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var k=a.document,n=k.createElementNS("http://www.w3.org/1999/xhtml","a"),w="download"in n,x=function(c){var e=k.createEvent("MouseEvents");e.initMouseEvent("click",!0,!1,a,0,0,0,0,0,!1,!1,!1,!1,0,null);c.dispatchEvent(e)},q=a.webkitRequestFileSystem,u=a.requestFileSystem||q||a.mozRequestFileSystem,
y=function(c){(a.setImmediate||a.setTimeout)(function(){throw c;},0)},r=0,s=function(c){var e=function(){"string"===typeof c?(a.URL||a.webkitURL||a).revokeObjectURL(c):c.remove()};a.chrome?e():setTimeout(e,10)},t=function(c,a,d){a=[].concat(a);for(var b=a.length;b--;){var l=c["on"+a[b]];if("function"===typeof l)try{l.call(c,d||c)}catch(f){y(f)}}},m=function(c,e){var d=this,b=c.type,l=!1,f,p,k=function(){t(d,["writestart","progress","write","writeend"])},g=function(){if(l||!f)f=(a.URL||a.webkitURL||
a).createObjectURL(c);p?p.location.href=f:void 0==a.open(f,"_blank")&&"undefined"!==typeof safari&&(a.location.href=f);d.readyState=d.DONE;k();s(f)},h=function(a){return function(){if(d.readyState!==d.DONE)return a.apply(this,arguments)}},m={create:!0,exclusive:!1},v;d.readyState=d.INIT;e||(e="download");if(w)f=(a.URL||a.webkitURL||a).createObjectURL(c),n.href=f,n.download=e,x(n),d.readyState=d.DONE,k(),s(f);else{a.chrome&&b&&"application/octet-stream"!==b&&(v=c.slice||c.webkitSlice,c=v.call(c,0,
c.size,"application/octet-stream"),l=!0);q&&"download"!==e&&(e+=".download");if("application/octet-stream"===b||q)p=a;u?(r+=c.size,u(a.TEMPORARY,r,h(function(a){a.root.getDirectory("saved",m,h(function(a){var b=function(){a.getFile(e,m,h(function(a){a.createWriter(h(function(b){b.onwriteend=function(b){p.location.href=a.toURL();d.readyState=d.DONE;t(d,"writeend",b);s(a)};b.onerror=function(){var a=b.error;a.code!==a.ABORT_ERR&&g()};["writestart","progress","write","abort"].forEach(function(a){b["on"+
a]=d["on"+a]});b.write(c);d.abort=function(){b.abort();d.readyState=d.DONE};d.readyState=d.WRITING}),g)}),g)};a.getFile(e,{create:!1},h(function(a){a.remove();b()}),h(function(a){a.code===a.NOT_FOUND_ERR?b():g()}))}),g)}),g)):g()}},b=m.prototype;b.abort=function(){this.readyState=this.DONE;t(this,"abort")};b.readyState=b.INIT=0;b.WRITING=1;b.DONE=2;b.error=b.onwritestart=b.onprogress=b.onwrite=b.onabort=b.onerror=b.onwriteend=null;return function(a,b){return new m(a,b)}}}("undefined"!==typeof self&&
self||"undefined"!==typeof window&&window||this.content);"undefined"!==typeof module&&null!==module?module.exports=saveAs:"undefined"!==typeof define&&null!==define&&null!=define.amd&&define([],function(){return saveAs});

let roomName = '🗿Sędzia Kalosz';
let maxPlayers = 13;
let roomPublic = true;
let hostName = '🗿Sędzia Kalosz';
let code = 'pl'; // Polska
let lat = 52;
let lon = 19;
let hostHidden = false;

/* STADION */
// Wartości dotyczą boiska na którym rozgrywany jest mecz - wartości domyślne to oficjalna mapa RS
let baseStadiumWidth = 1150;
let baseStadiumHeight = 600;
let stadiumWidth = 1150;
let stadiumHeight = 600;
let ballRadius = 9.8;
let isBackFurtherNeededDistance;
let outLineY;
let throwInLeeway = 350; // dozwolone odchylenie w poziomie przy wyrzucie z autu
let greenLine = 510; // punkt, w którym gracz jest styczny z linią boczną
let cornerPenaltyRadius = 330; // najmniejsza odległość od gracza do rogu, w której gracz nie przekracza łuku
let cornerLeftUpPos = {x: -1150, y: -600};
let cornerLeftDownPos = {x: -1150, y: 600};
let cornerRightUpPos = {x: 1150, y: -600};
let cornerRightDownPos = {x: 1150, y: 600};

/* USTAWIENIA */
isBackFurtherNeededDistance = ballRadius + 15 + 0.01;
outLineY = stadiumWidth - (ballRadius / 2) + 6; // 1150 - 9.8/2 + 6 = 1152.1
stadiumWidth = baseStadiumWidth + (ballRadius / 2) + 6; // 1150 + 9.8/2 + 6 = 1160.9
stadiumHeight = baseStadiumHeight + (ballRadius / 2) + 6; // 600 + 4.9 + 6 = 610.9

let players = null; // zmienia się przy wchodzeniu/wychodzeniu
let afks = []; // nieaktywni
let population = 0; // ludność - zależna od players
let activePop = 0; // aktywni - zależna od afks
let pvp = 0; // ile na ile
let url = '';

let matchCount = 0; // liczba meczów o punkty
let redTeam;
let blueTeam;
let specTeam;
let redCap;
let blueCap;
let specCap;

let Team =
{
    SPEC: 0,
    RED: 1,
    BLUE: 2
};
let redTeamPrefix = '[' + teamIcon(Team.RED) + 'R] ';
let blueTeamPrefix = '[' + teamIcon(Team.BLUE) + 'B] ';
let redTeamName = redTeamPrefix;
let blueTeamName = blueTeamPrefix;

let bijacze = {};
let bluzniercy = {};
let authConns = {};
let authPlayers = {};
let stats = {}; // słownik ze statystykami wszystkich graczy
let matchStats = {}; // statystyki w 1 meczu
let muted = {}; // słownik wyciszonych
let activities = {}; // słownik nieaktywnych
let unbanTimeout = {}; // uchwyty do opóźnień czyszczenia banów
let countAFK = false; // kiedy naliczać nieaktywność
let afkLimit = 12; // ile sekund można być nieaktywny
let secondsToUnban = 10 * 60; // za ile sekund odbanować
let minPlayersToStats = 3;
let minLimitsToStats = 3;
let maxLimitsToStats = 5;

let playerLang = new Map(); // ustawienia języka gracza
let playerGender = new Map(); // ustawienia płci gracza (dla szpaków)

let lastPlayerTouched = null;
let previousPlayerTouched = null;
let assistingPlayer = null
let redPossessionTicks = 0;
let bluePossessionTicks = 0;

// RS
let lastScores = 0;
let lastTeamTouched = 0;
let ballYPosition;
let exitingXPos = null; // miejsce wybicia piłki z autu
let previousBallYPosition;
let backFurtherMsgCanBeShown = false;
let lastCall; // 1, 2, CK, GK
let isBallUp = false;
let crossed = false;
let lineCrossedPlayers = [{name: 'temp', times: 0}];
let isBallKickedOutside = false;
let timeOutside = 0;
let playTimeInMinutes = 20; // Przy limicie czasu 0, mecz domyślnie trwa 20 minut
let isAutoPossEnabled = true; // Czy wyświetlać posiadanie co jakiś czas
let autoPossIntervalInMinutes = 5; // Co ile minut wyświetlić posiadanie piłki
let isAutoPossShown = false;
let isTimeAddedShown = false;
let isInactiveShown = {};
let actualTimeAdded;

let whoScoredList = [];
// Bramkarze
let gkRPosx = 0;
let gkBPosx = 0;
let gkR = null;
let gkB = null;
// Ustawienia
let isPaused = false;
let isRSRefEnabled = false; // czy ma być sędzia
let isSzpakoski = true; // Komentarz po bramkach
let isPausingEnabled = true; // czy można używać !p
let isChoosingTime = true; // czy można wybierać do drużyn
let isMatchValid = false; // czy mecz o punkty jest zaliczony
let isBadMap = false; // czy mapa nadaje się do meczów o punkty

let ballColor = NaN;

let tickCount = 0;
// Stany
let kickOff = false;
let isAfterTimeLimit = false;
let teamWon = false;

// Mapy
let maps =
{
	'RS': '{"name":"Real Soccer 1.3D by RawR","width":1300,"height":670,"bg":{"type":"grass","width":1150,"height":600,"kickOffRadius":180},"vertexes":[{"x":0,"y":700,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":180,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-180,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-700,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":1150,"y":255,"cMask":[]},{"x":840,"y":255,"cMask":[]},{"x":1150,"y":-255,"cMask":[]},{"x":840,"y":-255,"cMask":[]},{"x":1150,"y":155,"cMask":[]},{"x":1030,"y":155,"cMask":[]},{"x":1150,"y":-155,"cMask":[]},{"x":1030,"y":-155,"cMask":[]},{"x":840,"y":-135,"cMask":[]},{"x":840,"y":135,"cMask":[]},{"x":-1150,"y":-255,"cMask":[]},{"x":-840,"y":-255,"cMask":[]},{"x":-1150,"y":255,"cMask":[]},{"x":-840,"y":255,"cMask":[]},{"x":-1150,"y":-155,"cMask":[]},{"x":-1030,"y":-155,"cMask":[]},{"x":-1150,"y":155,"cMask":[]},{"x":-1030,"y":155,"cMask":[]},{"x":-840,"y":135,"cMask":[]},{"x":-840,"y":-135,"cMask":[]},{"x":935,"y":4,"cMask":[]},{"x":935,"y":-4,"cMask":[]},{"x":-935,"y":4,"cMask":[]},{"x":-935,"y":-4,"cMask":[]},{"x":-1150,"y":525,"bCoef":0,"cMask":["wall"]},{"x":-1075,"y":600,"bCoef":0,"cMask":["wall"]},{"x":-1075,"y":-600,"bCoef":0,"cMask":["wall"]},{"x":-1150,"y":-525,"bCoef":0,"cMask":["wall"]},{"x":1075,"y":600,"bCoef":0,"cMask":["wall"]},{"x":1150,"y":525,"bCoef":0,"cMask":["wall"]},{"x":1150,"y":-525,"bCoef":0,"cMask":["wall"]},{"x":1075,"y":-600,"bCoef":0,"cMask":["wall"]},{"x":-1150,"y":127,"cMask":[]},{"x":-1214,"y":124,"cMask":[]},{"x":-1150,"y":-127,"cMask":[]},{"x":-1214,"y":-124,"cMask":[]},{"x":1150,"y":127,"cMask":[]},{"x":1214,"y":124,"cMask":[]},{"x":1150,"y":-127,"cMask":[]},{"x":1214,"y":-124,"cMask":[]},{"x":0,"y":-4,"cMask":[]},{"x":0,"y":4,"cMask":[]},{"x":0,"y":-4,"cMask":[]},{"x":0,"y":4,"cMask":[]},{"x":-1214,"y":124,"cMask":[]},{"x":-1250,"y":150,"cMask":[]},{"x":-1214,"y":-124,"cMask":[]},{"x":-1250,"y":-150,"cMask":[]},{"x":1214,"y":124,"cMask":[]},{"x":1250,"y":150,"cMask":[]},{"x":1214,"y":-124,"cMask":[]},{"x":1250,"y":-150,"cMask":[]},{"x":-1185,"y":155,"bCoef":-4.5,"cMask":["ball"]},{"x":-1185,"y":255,"bCoef":-4.5,"cMask":["ball"]},{"x":1185,"y":155,"bCoef":-4.5,"cMask":["ball"]},{"x":1185,"y":255,"bCoef":-4.5,"cMask":["ball"]},{"x":-1185,"y":-155,"bCoef":-4.5,"cMask":["ball"]},{"x":-1185,"y":-255,"bCoef":-4.5,"cMask":["ball"]},{"x":1185,"y":-155,"bCoef":-4.5,"cMask":["ball"]},{"x":1185,"y":-255,"bCoef":-4.5,"cMask":["ball"]},{"x":1158,"y":-607,"bCoef":-2.45,"cMask":["ball"]},{"x":1187,"y":-578,"bCoef":-2.45,"cMask":["ball"]},{"x":1158,"y":607,"bCoef":-2.45,"cMask":["ball"]},{"x":1187,"y":578,"bCoef":-2.45,"cMask":["ball"]},{"x":-1158,"y":607,"bCoef":-2.45,"cMask":["ball"]},{"x":-1187,"y":578,"bCoef":-2.45,"cMask":["ball"]},{"x":-1158,"y":-607,"bCoef":-2.45,"cMask":["ball"]},{"x":-1187,"y":-578,"bCoef":-2.45,"cMask":["ball"]},{"x":-1190,"y":-255,"bCoef":-1,"cMask":["ball"]},{"x":-1180,"y":-255,"bCoef":-1,"cMask":["ball"]},{"x":-1190,"y":-155,"bCoef":-1,"cMask":["ball"]},{"x":-1180,"y":-155,"bCoef":-1,"cMask":["ball"]},{"x":-1190,"y":155,"bCoef":-1,"cMask":["ball"]},{"x":-1180,"y":155,"bCoef":-1,"cMask":["ball"]},{"x":-1190,"y":255,"bCoef":-1,"cMask":["ball"]},{"x":-1180,"y":255,"bCoef":-1,"cMask":["ball"]},{"x":1190,"y":-255,"bCoef":-1,"cMask":["ball"]},{"x":1180,"y":-255,"bCoef":-1,"cMask":["ball"]},{"x":1190,"y":-155,"bCoef":-1,"cMask":["ball"]},{"x":1180,"y":-155,"bCoef":-1,"cMask":["ball"]},{"x":1190,"y":255,"bCoef":-1,"cMask":["ball"]},{"x":1180,"y":255,"bCoef":-1,"cMask":["ball"]},{"x":1190,"y":155,"bCoef":-1,"cMask":["ball"]},{"x":1180,"y":155,"bCoef":-1,"cMask":["ball"]},{"x":-1148,"y":-525,"cMask":[]},{"x":1148,"y":-525,"cMask":[]},{"x":-1148,"y":525,"cMask":[]},{"x":1148,"y":525,"cMask":[]},{"x":-1150,"y":-260,"cMask":[]},{"x":-840,"y":-600,"cMask":[]},{"x":-1150,"y":260,"cMask":[]},{"x":-840,"y":600,"cMask":[]},{"x":-840,"y":-1150,"cMask":[]},{"x":1150,"y":-260,"cMask":[]},{"x":840,"y":-600,"cMask":[]},{"x":1150,"y":260,"cMask":[]},{"x":840,"y":600,"cMask":[]}],"segments":[{"v0":37,"v1":39,"bCoef":0.1,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":43,"v1":41,"bCoef":0.1,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":4,"v1":5,"cMask":[],"color":"C7E6BD"},{"v0":5,"v1":7,"cMask":[],"color":"C7E6BD"},{"v0":6,"v1":7,"cMask":[],"color":"C7E6BD"},{"v0":8,"v1":9,"cMask":[],"color":"C7E6BD"},{"v0":9,"v1":11,"cMask":[],"color":"C7E6BD"},{"v0":10,"v1":11,"cMask":[],"color":"C7E6BD"},{"v0":13,"v1":12,"curve":130,"curveF":0.4663076581549986,"cMask":[],"color":"C7E6BD"},{"v0":14,"v1":15,"cMask":[],"color":"C7E6BD"},{"v0":15,"v1":17,"cMask":[],"color":"C7E6BD"},{"v0":16,"v1":17,"cMask":[],"color":"C7E6BD"},{"v0":18,"v1":19,"cMask":[],"color":"C7E6BD"},{"v0":19,"v1":21,"cMask":[],"color":"C7E6BD"},{"v0":20,"v1":21,"cMask":[],"color":"C7E6BD"},{"v0":23,"v1":22,"curve":130,"curveF":0.4663076581549986,"cMask":[],"color":"C7E6BD"},{"v0":25,"v1":24,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":27,"v1":26,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":24,"v1":25,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":26,"v1":27,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":24,"v1":25,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"C7E6BD"},{"v0":26,"v1":27,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"C7E6BD"},{"v0":25,"v1":24,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"C7E6BD"},{"v0":27,"v1":26,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"C7E6BD"},{"v0":24,"v1":25,"cMask":[],"color":"C7E6BD"},{"v0":26,"v1":27,"cMask":[],"color":"C7E6BD"},{"v0":28,"v1":29,"bCoef":0,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["wall"],"color":"C7E6BD"},{"v0":30,"v1":31,"bCoef":0,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["wall"],"color":"C7E6BD"},{"v0":32,"v1":33,"bCoef":0,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["wall"],"color":"C7E6BD"},{"v0":34,"v1":35,"bCoef":0,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["wall"],"color":"C7E6BD"},{"v0":36,"v1":37,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":39,"v1":38,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":41,"v1":40,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":42,"v1":43,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":45,"v1":44,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":46,"v1":47,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":45,"v1":44,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"C7E6BD"},{"v0":46,"v1":47,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"C7E6BD"},{"v0":48,"v1":49,"cMask":[],"color":"FFFFFF"},{"v0":50,"v1":51,"cMask":[],"color":"FFFFFF"},{"v0":52,"v1":53,"cMask":[],"color":"FFFFFF"},{"v0":54,"v1":55,"cMask":[],"color":"FFFFFF"},{"v0":56,"v1":57,"bCoef":-4.7,"curve":40,"curveF":2.7474774194546225,"cMask":["ball"],"color":"BEB86C"},{"v0":59,"v1":58,"bCoef":-4.7,"curve":40,"curveF":2.7474774194546225,"cMask":["ball"],"color":"BEB86C"},{"v0":61,"v1":60,"bCoef":-4.7,"curve":40,"curveF":2.7474774194546225,"cMask":["ball"],"color":"BEB86C"},{"v0":62,"v1":63,"bCoef":-4.7,"curve":40,"curveF":2.7474774194546225,"cMask":["ball"],"color":"BEB86C"},{"v0":65,"v1":64,"bCoef":-2.45,"curve":59.99999999999999,"curveF":1.7320508075688774,"cMask":["ball"],"color":"BEB86C"},{"v0":66,"v1":67,"bCoef":-2.45,"curve":59.99999999999999,"curveF":1.7320508075688774,"cMask":["ball"],"color":"BEB86C"},{"v0":69,"v1":68,"bCoef":-2.45,"curve":59.99999999999999,"curveF":1.7320508075688774,"cMask":["ball"],"color":"BEB86C"},{"v0":70,"v1":71,"bCoef":-2.45,"curve":59.99999999999999,"curveF":1.7320508075688774,"cMask":["ball"],"color":"BEB86C"},{"v0":0,"v1":1,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":1,"v1":2,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["blueKO"]},{"v0":2,"v1":1,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["redKO"]},{"v0":2,"v1":3,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":72,"v1":73,"bCoef":-1,"cMask":["ball"]},{"v0":74,"v1":75,"bCoef":-1,"cMask":["ball"]},{"v0":76,"v1":77,"bCoef":-1,"cMask":["ball"]},{"v0":78,"v1":79,"bCoef":-1,"cMask":["ball"]},{"v0":80,"v1":81,"bCoef":-1,"cMask":["ball"]},{"v0":82,"v1":83,"bCoef":-1,"cMask":["ball"]},{"v0":84,"v1":85,"bCoef":-1,"cMask":["ball"]},{"v0":86,"v1":87,"bCoef":-1,"cMask":["ball"]},{"v0":88,"v1":89,"cMask":[],"color":"5E844D"},{"v0":90,"v1":91,"cMask":[],"color":"5E844D"},{"v0":93,"v1":92,"curve":100,"curveF":0.83909963117728,"cMask":[],"color":"5E844D"},{"v0":94,"v1":95,"curve":100,"curveF":0.83909963117728,"cMask":[],"color":"5E844D"},{"v0":97,"v1":98,"curve":100,"curveF":0.83909963117728,"cMask":[],"color":"5E844D"},{"v0":100,"v1":99,"curve":100,"curveF":0.83909963117728,"cMask":[],"color":"5E844D"}],"planes":[{"normal":[0,1],"dist":-635,"bCoef":0,"cMask":["ball"]},{"normal":[0,-1],"dist":-635,"bCoef":0,"cMask":["ball"]},{"normal":[0,1],"dist":-670,"bCoef":0},{"normal":[0,-1],"dist":-670,"bCoef":0},{"normal":[1,0],"dist":-1300,"bCoef":0},{"normal":[-1,0],"dist":-1300,"bCoef":0.1},{"normal":[1,0],"dist":-1214,"bCoef":0,"cMask":["ball"]},{"normal":[-1,0],"dist":-1214,"bCoef":0,"cMask":["ball"]}],"goals":[{"p0":[-1160,-124],"p1":[-1160,124],"team":"red"},{"p0":[1160,124],"p1":[1160,-124],"team":"blue"}],"discs":[{"radius":9.8,"invMass":1.05,"cGroup":["ball","kick","score"]},{"pos":[-1150,127],"radius":5,"invMass":0,"color":"FF0000"},{"pos":[-1150,-127],"radius":5,"invMass":0,"color":"FF0000"},{"pos":[1150,127],"radius":5,"invMass":0,"color":"FF"},{"pos":[1150,-127],"radius":5,"invMass":0,"color":"FF"},{"pos":[-1250,150],"radius":3,"bCoef":3,"invMass":0,"color":"FF0000","cMask":[]},{"pos":[-1250,-150],"radius":3,"bCoef":3,"invMass":0,"color":"FF0000","cMask":[]},{"pos":[1250,150],"radius":3,"bCoef":3,"invMass":0,"color":"FF","cMask":[]},{"pos":[1250,-150],"radius":3,"bCoef":3,"invMass":0,"color":"FF","cMask":[]},{"pos":[-1150,-600],"radius":2,"bCoef":-0.1,"invMass":0,"cMask":["ball"]},{"pos":[-1150,600],"radius":2,"bCoef":-0.1,"invMass":0,"cMask":["ball"]},{"pos":[1150,-600],"radius":2,"bCoef":-0.1,"invMass":0,"cMask":["ball"]},{"pos":[1150,600],"radius":2,"bCoef":-0.1,"invMass":0,"cMask":["ball"]}],"playerPhysics":{"acceleration":0.12,"kickStrength":5.65},"ballPhysics":"disc0","spawnDistance":500}',
	'PENS RS': '{"name":"Penalty RSHL.eu v1.2","width":500,"height":620,"bg":{"type":"grass","width":215,"height":600,"kickOffRadius":1},"vertexes":[{"x":275,"y":-110,"bCoef":0.1},{"x":215,"y":-110,"bCoef":0.1},{"x":275,"y":110,"bCoef":0.1},{"x":215,"y":110,"bCoef":0.1},{"x":315,"y":150,"cMask":[]},{"x":315,"y":-150,"cMask":[]},{"x":215,"y":150,"cMask":[]},{"x":85,"y":150,"cMask":[]},{"x":215,"y":-150,"cMask":[]},{"x":85,"y":-150,"cMask":[]},{"x":215,"y":260,"cMask":[]},{"x":-95,"y":260,"cMask":[]},{"x":215,"y":-260,"cMask":[]},{"x":-95,"y":-260,"cMask":[]},{"x":-95,"y":130,"cMask":[]},{"x":-95,"y":-130,"cMask":[]},{"x":-213,"y":-520,"cMask":[]},{"x":213,"y":-520,"cMask":[]},{"x":-213,"y":520,"cMask":[]},{"x":213,"y":520,"cMask":[]},{"x":-95,"y":598,"cMask":[]},{"x":213,"y":290,"cMask":[]},{"x":-95,"y":-598,"cMask":[]},{"x":213,"y":-290,"cMask":[]},{"x":265,"y":570,"bCoef":-2.75,"cMask":["ball"]},{"x":235,"y":600,"bCoef":-2.75,"cMask":["ball"]},{"x":235,"y":610,"bCoef":-0.001,"cMask":["ball"]},{"x":275,"y":570,"bCoef":-0.001,"cMask":["ball"]},{"x":265,"y":-570,"bCoef":-2.75,"cMask":["ball"]},{"x":235,"y":-600,"bCoef":-2.75,"cMask":["ball"]},{"x":235,"y":-610,"bCoef":-0.001,"cMask":["ball"]},{"x":275,"y":-570,"bCoef":-0.001,"cMask":["ball"]},{"x":255,"y":160,"bCoef":-0.001,"cMask":["ball"]},{"x":255,"y":250,"bCoef":-0.001,"cMask":["ball"]},{"x":260,"y":250,"bCoef":-0.001,"cMask":["ball"]},{"x":250,"y":250,"bCoef":-0.001,"cMask":["ball"]},{"x":260,"y":160,"bCoef":-0.001,"cMask":["ball"]},{"x":250,"y":160,"bCoef":-0.001,"cMask":["ball"]},{"x":255,"y":-160,"bCoef":-0.001,"cMask":["ball"]},{"x":255,"y":-250,"bCoef":-0.001,"cMask":["ball"]},{"x":260,"y":-250,"bCoef":-0.001,"cMask":["ball"]},{"x":250,"y":-250,"bCoef":-0.001,"cMask":["ball"]},{"x":260,"y":-160,"bCoef":-0.001,"cMask":["ball"]},{"x":250,"y":-160,"bCoef":-0.001,"cMask":["ball"]},{"x":215,"y":-580,"cMask":[]},{"x":195,"y":-600,"cMask":[]},{"x":215,"y":580,"cMask":[]},{"x":195,"y":600,"cMask":[]},{"x":0,"y":4,"cMask":[]},{"x":0,"y":-4,"cMask":[]},{"x":0,"y":-257,"cMask":[]},{"x":0,"y":-7,"cMask":[]},{"x":0,"y":7,"cMask":[]},{"x":0,"y":257,"cMask":[]},{"x":0,"y":263,"cMask":[]},{"x":0,"y":597,"cMask":[]},{"x":0,"y":-597,"cMask":[]},{"x":0,"y":-263,"cMask":[]}],"segments":[{"v0":1,"v1":0,"bCoef":0.1,"curve":10,"curveF":11.430052302761343,"color":"FFFFFF"},{"v0":2,"v1":3,"bCoef":0.1,"curve":10,"curveF":11.430052302761343,"color":"FFFFFF"},{"v0":0,"v1":2,"bCoef":0.1,"curve":10,"curveF":11.430052302761343,"color":"FFFFFF"},{"v0":2,"v1":4,"cMask":[],"color":"DCDCDC"},{"v0":0,"v1":5,"cMask":[],"color":"DCDCDC"},{"v0":6,"v1":7,"cMask":[],"color":"C7E6BD"},{"v0":8,"v1":9,"cMask":[],"color":"C7E6BD"},{"v0":7,"v1":9,"cMask":[],"color":"C7E6BD"},{"v0":10,"v1":11,"cMask":[],"color":"C7E6BD"},{"v0":12,"v1":13,"cMask":[],"color":"C7E6BD"},{"v0":11,"v1":13,"cMask":[],"color":"C7E6BD"},{"v0":14,"v1":15,"curve":130,"curveF":0.4663076581549986,"cMask":[],"color":"C7E6BD"},{"v0":16,"v1":17,"cMask":[],"color":"5E844D"},{"v0":18,"v1":19,"cMask":[],"color":"5E844D"},{"v0":20,"v1":21,"curve":100,"curveF":0.83909963117728,"cMask":[],"color":"5E844D"},{"v0":23,"v1":22,"curve":100,"curveF":0.83909963117728,"cMask":[],"color":"5E844D"},{"v0":25,"v1":24,"bCoef":-2.75,"curve":70,"curveF":1.4281480067421146,"cMask":["ball"],"color":"BEB86C"},{"v0":25,"v1":26,"bCoef":-0.001,"cMask":["ball"]},{"v0":24,"v1":27,"bCoef":-0.001,"cMask":["ball"]},{"v0":28,"v1":29,"bCoef":-2.75,"curve":70,"curveF":1.4281480067421146,"cMask":["ball"],"color":"BEB86C"},{"v0":29,"v1":30,"bCoef":-0.001,"cMask":["ball"]},{"v0":28,"v1":31,"bCoef":-0.001,"cMask":["ball"]},{"v0":33,"v1":32,"bCoef":-4.75,"curve":29.999999999999996,"curveF":3.7320508075688776,"cMask":["ball"],"color":"BEB86C"},{"v0":34,"v1":35,"bCoef":-0.001,"cMask":["ball"]},{"v0":36,"v1":37,"bCoef":-0.001,"cMask":["ball"]},{"v0":38,"v1":39,"bCoef":-4.75,"curve":29.999999999999996,"curveF":3.7320508075688776,"cMask":["ball"],"color":"BEB86C"},{"v0":40,"v1":41,"bCoef":-0.001,"cMask":["ball"]},{"v0":42,"v1":43,"bCoef":-0.001,"cMask":["ball"]},{"v0":44,"v1":45,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"C7E6BD"},{"v0":47,"v1":46,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"C7E6BD"},{"v0":48,"v1":49,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"C7E6BD"},{"v0":49,"v1":48,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"C7E6BD"},{"v0":48,"v1":49,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":49,"v1":48,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":45,"v1":47,"bCoef":0,"vis":false,"cMask":["blue"]},{"v0":50,"v1":51,"cMask":[],"color":"6A8F59"},{"v0":52,"v1":53,"cMask":[],"color":"6A8F59"},{"v0":54,"v1":55,"cMask":[],"color":"6A8F59"},{"v0":56,"v1":57,"cMask":[],"color":"6A8F59"}],"planes":[{"normal":[0,1],"dist":-600,"bCoef":0},{"normal":[0,-1],"dist":-600,"bCoef":0},{"normal":[1,0],"dist":-215,"bCoef":0},{"normal":[-1,0],"dist":-285,"bCoef":0},{"normal":[-1,0],"dist":-20,"bCoef":0,"cMask":["red"]},{"normal":[-1,0],"dist":-250,"bCoef":0,"cMask":["blue"]}],"goals":[{"p0":[225,-110],"p1":[225,110],"team":"blue"},{"p0":[215,-112],"p1":[-10,-10],"team":"red"},{"p0":[-10,-10],"p1":[-10,10],"team":"red"},{"p0":[-10,10],"p1":[215,112],"team":"red"}],"discs":[{"cGroup":["ball","kick","score"]},{"pos":[215,-110],"radius":5,"invMass":0},{"pos":[215,110],"radius":5,"invMass":0},{"pos":[315,150],"radius":3,"color":"DCDCDC","cMask":[]},{"pos":[315,-150],"radius":3,"color":"DCDCDC","cMask":[]},{"pos":[215,-600],"radius":2,"bCoef":-0.1,"invMass":0,"color":"FFFF00","cMask":["ball"]},{"pos":[215,600],"radius":2,"bCoef":-0.1,"invMass":0,"color":"FFFF00","cMask":["ball"]}],"playerPhysics":{"acceleration":0.12,"kickStrength":5.65},"ballPhysics":"disc0","spawnDistance":215}',
	'PENS QUICK': '{"name":"Penalty 1.1 Mod","width":420,"height":200,"bg":{"type":"grass","width":500,"height":250,"kickOffRadius":10},"vertexes":[{"x":420,"y":600,"cMask":["ball"]},{"x":420,"y":-600,"cMask":["ball"]},{"x":283,"y":500,"bCoef":0,"cMask":["blue"]},{"x":283,"y":-500,"bCoef":0,"cMask":["blue"]},{"x":335,"y":500,"bCoef":0,"cMask":["blue"]},{"x":335,"y":-500,"bCoef":0,"cMask":["blue"]},{"x":-475,"y":-200,"bCoef":0,"cMask":["red"]},{"x":-10,"y":-190,"bCoef":0,"cMask":["red"]},{"x":-10,"y":190,"bCoef":0,"cMask":["red"]},{"x":-475,"y":200,"bCoef":0,"cMask":["red"]},{"x":300,"y":-250,"cMask":[]},{"x":300,"y":250,"cMask":[]},{"x":0,"y":9,"cMask":[]},{"x":0,"y":-9,"cMask":[]},{"x":0,"y":9,"cMask":[]},{"x":0,"y":-9,"cMask":[]},{"x":175,"y":-175,"cMask":[]},{"x":300,"y":-175,"cMask":[]},{"x":175,"y":175,"cMask":[]},{"x":300,"y":175,"cMask":[]},{"x":-120,"y":-250,"cMask":[]},{"x":-120,"y":250,"cMask":[]},{"x":-120,"y":-190,"cMask":[]},{"x":-120,"y":190,"cMask":[]},{"x":300,"y":-100,"cMask":[]},{"x":350,"y":-98,"cMask":[]},{"x":350,"y":98,"cMask":[]},{"x":300,"y":100,"cMask":[]},{"x":0,"y":-15,"bCoef":-2.4,"cMask":["ball"]},{"x":0,"y":15,"bCoef":-2.4,"cMask":["ball"]},{"x":400,"y":-135,"cMask":[]},{"x":400,"y":135,"cMask":[]}],"segments":[{"v0":0,"v1":1,"vis":false,"cMask":["ball"]},{"v0":2,"v1":3,"bCoef":0,"vis":false,"cMask":["blue"]},{"v0":4,"v1":5,"bCoef":0,"vis":false,"cMask":["blue"]},{"v0":6,"v1":7,"bCoef":0,"vis":false,"cMask":["red"]},{"v0":7,"v1":8,"bCoef":0,"curve":50,"curveF":2.1445069205095586,"vis":false,"cMask":["red"]},{"v0":8,"v1":9,"bCoef":0,"vis":false,"cMask":["red"]},{"v0":9,"v1":6,"bCoef":0,"vis":false,"cMask":["red"]},{"v0":10,"v1":11,"cMask":[],"color":"C7E6BD"},{"v0":13,"v1":12,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":14,"v1":15,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":16,"v1":17,"cMask":[],"color":"C7E6BD"},{"v0":16,"v1":18,"cMask":[],"color":"C7E6BD"},{"v0":18,"v1":19,"cMask":[],"color":"C7E6BD"},{"v0":20,"v1":21,"cMask":[],"color":"C7E6BD"},{"v0":23,"v1":22,"curve":140,"curveF":0.36397023426620245,"cMask":[],"color":"C7E6BD"},{"v0":24,"v1":25,"bCoef":0.1,"curve":10,"curveF":11.430052302761343,"cMask":["red","blue","ball"],"color":"C7E6BD"},{"v0":25,"v1":26,"bCoef":0.1,"curve":10,"curveF":11.430052302761343,"cMask":["red","blue","ball"],"color":"C7E6BD"},{"v0":26,"v1":27,"bCoef":0.1,"curve":10,"curveF":11.430052302761343,"cMask":["red","blue","ball"],"color":"C7E6BD"},{"v0":28,"v1":29,"bCoef":-2.4,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["ball"],"color":"C7E6BD"},{"v0":25,"v1":30,"cMask":[],"color":"C7E6BD"},{"v0":26,"v1":31,"cMask":[],"color":"C7E6BD"}],"planes":[{"normal":[0,1],"dist":-200,"cMask":["ball"]},{"normal":[0,-1],"dist":-200,"cMask":["ball"]},{"normal":[0,1],"dist":-250,"bCoef":0.1},{"normal":[0,-1],"dist":-250,"bCoef":0.1},{"normal":[1,0],"dist":-400,"bCoef":0.1},{"normal":[-1,0],"dist":-400,"bCoef":0.1}],"goals":[{"p0":[310,100],"p1":[310,-100],"team":"blue"},{"p0":[300,100],"p1":[-400,100],"team":"red"},{"p0":[300,-100],"p1":[-400,-100],"team":"red"},{"p0":[-10,250],"p1":[-10,-250],"team":"red"}],"discs":[{"cGroup":["ball","kick","score"]},{"pos":[300,100],"radius":5,"bCoef":1.3,"invMass":0},{"pos":[300,-100],"radius":5,"bCoef":1.3,"invMass":0},{"pos":[400,-135],"radius":3,"bCoef":1,"invMass":0},{"pos":[400,135],"radius":3,"bCoef":1,"invMass":0}],"playerPhysics":{},"ballPhysics":"disc0","spawnDistance":300}',
	'PENS VS PENS': '{"name":"Penalty vs Penalty MOD By iShow","width":420,"height":200,"spawnDistance":235,"bg":{"type":"grass","width":500,"height":250,"kickOffRadius":10,"cornerRadius":0},"vertexes":[{"x":348,"y":200,"trait":"ballArea"},{"x":349,"y":-202,"trait":"ballArea"},{"x":262,"y":204,"trait":"gkArea","curve":0},{"x":259,"y":-200,"trait":"gkArea","curve":0},{"x":-1,"y":-248,"trait":"penArea"},{"x":1,"y":249,"trait":"penArea"},{"x":239,"y":-251,"trait":"line"},{"x":239,"y":249,"trait":"line"},{"x":0,"y":9,"trait":"line"},{"x":0,"y":-9,"trait":"line"},{"x":0,"y":9,"trait":"line"},{"x":0,"y":-9,"trait":"line"},{"x":114,"y":-175,"trait":"line"},{"x":239,"y":-175,"trait":"line"},{"x":114,"y":175,"trait":"line"},{"x":239,"y":175,"trait":"line"},{"x":239,"y":-100,"trait":"line"},{"x":289,"y":-98,"trait":"line"},{"x":289,"y":98,"trait":"line"},{"x":239,"y":100,"trait":"line"},{"x":0,"y":-20,"trait":"powerboost"},{"x":0,"y":20,"trait":"powerboost"},{"x":339,"y":-135,"trait":"line"},{"x":339,"y":135,"trait":"line"},{"x":0,"y":-20,"trait":"powerboost"},{"x":0,"y":20,"trait":"powerboost"},{"x":239,"y":-100,"trait":"line"},{"x":289,"y":-98,"trait":"line"},{"x":289,"y":98,"trait":"line"},{"x":239,"y":100,"trait":"line"},{"x":339,"y":-135,"trait":"line"},{"x":339,"y":135,"trait":"line"},{"x":239,"y":-100,"trait":"line"},{"x":289,"y":-98,"trait":"line"},{"x":289,"y":98,"trait":"line"},{"x":239,"y":100,"trait":"line"},{"x":339,"y":-135,"trait":"line"},{"x":339,"y":135,"trait":"line"},{"x":239,"y":-100,"trait":"line"},{"x":289,"y":-98,"trait":"line"},{"x":289,"y":98,"trait":"line"},{"x":239,"y":100,"trait":"line"},{"x":339,"y":-135,"trait":"line"},{"x":339,"y":135,"trait":"line"},{"x":239,"y":-100,"trait":"line"},{"x":289,"y":-98,"trait":"line"},{"x":289,"y":98,"trait":"line"},{"x":239,"y":100,"trait":"line"},{"x":339,"y":-135,"trait":"line"},{"x":339,"y":135,"trait":"line"},{"x":239,"y":-100,"trait":"line"},{"x":289,"y":-98,"trait":"line"},{"x":289,"y":98,"trait":"line"},{"x":239,"y":100,"trait":"line"},{"x":339,"y":-135,"trait":"line"},{"x":339,"y":135,"trait":"line"},{"x":-237,"y":-250,"trait":"line"},{"x":-238,"y":251,"trait":"line"},{"x":-130,"y":-180,"trait":"line"},{"x":-238,"y":-177,"trait":"line"},{"x":-237,"y":172,"trait":"line"},{"x":-239,"y":-102,"trait":"line"},{"x":-298,"y":-100,"trait":"line"},{"x":-298,"y":96,"trait":"line"},{"x":-239,"y":98,"trait":"line"},{"x":-353,"y":-117,"trait":"line"},{"x":-348,"y":120,"trait":"line"},{"x":-259,"y":199,"cMask":["red"],"trait":"gkArea","curve":0},{"x":-262,"y":-200,"cMask":["red"],"trait":"gkArea","curve":0},{"x":-281,"y":-202,"cMask":["red"],"trait":"gkArea"},{"x":0,"y":-249,"cMask":["blue"],"trait":"penArea"},{"x":1,"y":249,"cMask":["blue"],"trait":"penArea"},{"x":-238,"y":-177,"trait":"line"},{"x":-113,"y":-177,"trait":"line"},{"x":-113,"y":-177,"trait":"line"},{"x":-113,"y":173,"trait":"line"},{"x":-238,"y":173,"trait":"line"},{"x":-113,"y":173,"trait":"line"},{"x":-395,"y":197,"trait":"ballArea"},{"x":-395,"y":-203,"trait":"ballArea"},{"x":244,"y":198,"cMask":["red","blue"],"trait":"gkArea"},{"x":-241,"y":197,"cMask":["red","blue"],"trait":"gkArea"},{"x":244,"y":-200,"cMask":["red","blue"],"trait":"gkArea"},{"x":-264,"y":-200,"cMask":["red","blue"],"trait":"gkArea"},{"x":-219,"y":198,"cMask":["red"],"cGroup":["blueKO"],"trait":"gkArea","curve":0},{"x":-219,"y":-202,"cMask":["red"],"cGroup":["blueKO"],"trait":"gkArea","curve":0},{"x":359,"y":-195,"bCoef":1,"cMask":["blue"],"cGroup":["redKO"],"trait":"gkArea","color":"C7E6BD"},{"x":-356,"y":-188},{"x":-356,"y":-151},{"x":-319,"y":-187},{"x":-321,"y":-152},{"x":-304,"y":-152},{"x":220,"y":197,"cMask":["blue"],"cGroup":["redKO"],"trait":"gkArea","curve":0},{"x":216,"y":-201,"cMask":["blue"],"cGroup":["redKO"],"trait":"gkArea","curve":0}],"segments":[{"v0":0,"v1":1,"curve":0,"trait":"ballArea"},{"v0":2,"v1":3,"curve":0,"trait":"gkArea","x":289},{"v0":4,"v1":5,"curve":12.9627188896,"trait":"penArea"},{"v0":6,"v1":7,"trait":"line"},{"v0":8,"v1":9,"curve":-180,"trait":"line"},{"v0":10,"v1":11,"curve":180,"trait":"line"},{"v0":12,"v1":13,"trait":"line"},{"v0":12,"v1":14,"curve":0,"trait":"line"},{"v0":14,"v1":15,"trait":"line"},{"v0":16,"v1":17,"curve":10,"trait":"goalnet"},{"v0":17,"v1":18,"curve":10,"trait":"goalnet"},{"v0":18,"v1":19,"curve":10,"trait":"goalnet"},{"v0":20,"v1":21,"curve":147.479590583,"trait":"powerboost"},{"v0":17,"v1":22,"trait":"line"},{"v0":18,"v1":23,"trait":"line"},{"v0":24,"v1":25,"curve":-148.184896139,"trait":"powerboost"},{"v0":28,"v1":29,"curve":10,"trait":"goalnet"},{"v0":27,"v1":30,"trait":"line"},{"v0":28,"v1":31,"trait":"line"},{"v0":34,"v1":37,"curve":-10.5971301398,"trait":"line"},{"v0":56,"v1":57,"trait":"line"},{"v0":61,"v1":62,"curve":10,"trait":"goalnet"},{"v0":62,"v1":63,"curve":-9.99795863528,"trait":"goalnet"},{"v0":63,"v1":64,"curve":7.89037245808,"trait":"goalnet"},{"v0":62,"v1":65,"trait":"line"},{"v0":63,"v1":66,"trait":"line"},{"v0":67,"v1":68,"curve":0,"cMask":["red"],"trait":"gkArea","x":-283},{"v0":70,"v1":71,"curve":-13.0515007508,"cMask":["blue"],"trait":"penArea"},{"v0":72,"v1":73,"trait":"line"},{"v0":74,"v1":75,"curve":0,"trait":"line"},{"v0":76,"v1":77,"trait":"line"},{"v0":78,"v1":79,"trait":"ballArea"},{"v0":80,"v1":81,"curve":-1.88527887644,"cMask":["red","blue"],"trait":"gkArea"},{"v0":82,"v1":83,"curve":0,"cMask":["red","blue"],"trait":"gkArea"},{"v0":84,"v1":85,"curve":0,"cMask":["red"],"cGroup":["blueKO"],"trait":"gkArea","x":-235},{"v0":87,"v1":88,"curve":-9.99795863528,"vis":true,"color":"C7E6BD"},{"v0":89,"v1":90,"curve":-9.99795863528,"vis":true,"color":"C7E6BD"},{"v0":90,"v1":91,"curve":-9.99795863528,"vis":true,"color":"C7E6BD"},{"v0":92,"v1":93,"curve":0,"cMask":["blue"],"cGroup":["redKO"],"trait":"gkArea","x":240}],"goals":[{"p0":[239,-100],"p1":[239,100],"team":"blue"},{"p0":[-237,100],"p1":[-237,-100],"team":"red"},{"p0":[238,101],"p1":[114,104],"team":"red"},{"p0":[114,-100],"p1":[237,-99],"team":"red"},{"p0":[-238,103],"p1":[-113,105],"team":"blue"},{"p0":[-235,-103],"p1":[-113,-106],"team":"blue"},{"p0":[-256,146],"p1":[-6,7],"team":"blue"},{"p0":[8,9],"p1":[156,103],"team":"red"},{"p0":[8,-9],"p1":[161,-103],"team":"red"},{"p0":[-142,-115],"p1":[-3,-9],"team":"blue"},{"p0":[11,-100],"p1":[134,-99],"team":"red"},{"p0":[129,102],"p1":[5,105],"team":"red"}],"discs":[{"pos":[239,100],"trait":"goalPost"},{"pos":[239,-100],"trait":"goalPost"},{"pos":[339,-135],"trait":"stanchion"},{"pos":[339,135],"trait":"stanchion"},{"pos":[239,100],"trait":"goalPost"},{"pos":[239,-100],"trait":"goalPost"},{"pos":[339,-135],"trait":"stanchion"},{"pos":[339,135],"trait":"stanchion"},{"pos":[239,100],"trait":"goalPost"},{"pos":[239,-100],"trait":"goalPost"},{"pos":[339,-135],"trait":"stanchion"},{"pos":[339,135],"trait":"stanchion"},{"pos":[239,100],"trait":"goalPost"},{"pos":[239,-100],"trait":"goalPost"},{"pos":[339,-135],"trait":"stanchion"},{"pos":[339,135],"trait":"stanchion"},{"pos":[239,100],"trait":"goalPost"},{"pos":[239,-100],"trait":"goalPost"},{"pos":[339,-135],"trait":"stanchion"},{"pos":[339,135],"trait":"stanchion"},{"pos":[239,100],"trait":"goalPost"},{"pos":[239,-100],"trait":"goalPost"},{"pos":[339,-135],"trait":"stanchion"},{"pos":[339,135],"trait":"stanchion"},{"pos":[-239,-102],"trait":"goalPost"},{"pos":[-353,-117],"trait":"stanchion"},{"pos":[-348,120],"trait":"stanchion"},{"pos":[-240,98],"trait":"goalPost"},{"radius":2,"invMass":0,"pos":[-338,-150],"color":"C7E6BD"}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"gkArea":{"vis":false,"bCoef":1,"cMask":["blue"]},"penArea":{"vis":false,"bCoef":0,"cMask":["red"]},"line":{"vis":true,"color":"C7E6BD","cMask":[]},"goalnet":{"vis":true,"bCoef":0.1,"color":"C7E6BD","cMask":["ball","red"]},"powerboost":{"vis":false,"bCoef":-2.7,"cMask":["ball"],"color":"C7E6BD"},"goalPost":{"radius":5,"invMass":0,"bCoef":1.3,"color":"FFFFFF"},"stanchion":{"radius":3,"invMass":0,"bCoef":1,"color":"FFFFFF"}},"planes":[],"playerPhysics":{"acceleration":0.2,"kickStrength":10}}',

	'POWER CLASSIC': '{"name":"Power Finezja Classic fixed","width":420,"height":200,"spawnDistance":170,"bg":{"type":"grass","width":370,"height":170,"kickOffRadius":75,"cornerRadius":0},"playerPhysics":{"bCoef":0.5,"invMass":0.5,"damping":0.96,"acceleration":0.12,"kickingAcceleration":0.12,"kickingDamping":0.96,"kickStrength":11},"vertexes":[{"x":-370,"y":170,"trait":"ballArea"},{"x":-370,"y":64,"trait":"ballArea"},{"x":-370,"y":-64,"trait":"ballArea"},{"x":-370,"y":-170,"trait":"ballArea"},{"x":370,"y":170,"trait":"ballArea"},{"x":370,"y":64,"trait":"ballArea"},{"x":370,"y":-64,"trait":"ballArea"},{"x":370,"y":-170,"trait":"ballArea"},{"x":0,"y":200,"trait":"kickOffBarrier"},{"x":0,"y":75,"trait":"kickOffBarrier"},{"x":0,"y":-75,"trait":"kickOffBarrier"},{"x":0,"y":-200,"trait":"kickOffBarrier"},{"x":-380,"y":-64,"trait":"goalNet"},{"x":-400,"y":-44,"trait":"goalNet"},{"x":-400,"y":44,"trait":"goalNet"},{"x":-380,"y":64,"trait":"goalNet"},{"x":380,"y":-64,"trait":"goalNet"},{"x":400,"y":-44,"trait":"goalNet"},{"x":400,"y":44,"trait":"goalNet"},{"x":380,"y":64,"trait":"goalNet"},{"bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-380,"y":-64},{"bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-380,"y":64},{"bCoef":1,"cMask":["ball"],"trait":"ballArea","x":380,"y":-64},{"bCoef":1,"cMask":["ball"],"trait":"ballArea","x":380,"y":64},{"bCoef":1,"trait":"ballArea","x":385,"y":64,"cMask":["ball"]},{"bCoef":1,"trait":"ballArea","x":385,"y":170,"cMask":["ball"]},{"bCoef":1,"trait":"ballArea","x":385,"y":-170,"cMask":["ball"]},{"bCoef":1,"trait":"ballArea","x":385,"y":-64,"cMask":["ball"]},{"bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-385,"y":64},{"bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-385,"y":170},{"bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-385,"y":-170},{"bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-385,"y":-64},{"bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-385,"y":-170},{"bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-385,"y":-64},{"bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-385,"y":-170},{"bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-385,"y":-64},{"bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-385,"y":64},{"bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-385,"y":170},{"bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-385,"y":64},{"bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-385,"y":170},{"bCoef":1,"trait":"ballArea","x":385,"y":-170,"cMask":["ball"]},{"bCoef":1,"trait":"ballArea","x":385,"y":-64,"cMask":["ball"]},{"bCoef":1,"trait":"ballArea","x":385,"y":-170,"cMask":["ball"]},{"bCoef":1,"trait":"ballArea","x":385,"y":-64,"cMask":["ball"]},{"bCoef":1,"trait":"ballArea","x":385,"y":64,"cMask":["ball"]},{"bCoef":1,"trait":"ballArea","x":385,"y":170,"cMask":["ball"]},{"bCoef":1,"trait":"ballArea","x":385,"y":64,"cMask":["ball"]},{"bCoef":1,"trait":"ballArea","x":385,"y":170,"cMask":["ball"]}],"segments":[{"v0":0,"v1":1,"trait":"ballArea"},{"v0":2,"v1":3,"trait":"ballArea"},{"v0":4,"v1":5,"trait":"ballArea"},{"v0":6,"v1":7,"trait":"ballArea"},{"v0":12,"v1":13,"trait":"goalNet","curve":-90},{"v0":13,"v1":14,"trait":"goalNet"},{"v0":14,"v1":15,"trait":"goalNet","curve":-90},{"v0":16,"v1":17,"trait":"goalNet","curve":90},{"v0":17,"v1":18,"trait":"goalNet"},{"v0":18,"v1":19,"trait":"goalNet","curve":90},{"v0":8,"v1":9,"trait":"kickOffBarrier"},{"v0":9,"v1":10,"trait":"kickOffBarrier","curve":180,"cGroup":["blueKO"]},{"v0":9,"v1":10,"trait":"kickOffBarrier","curve":-180,"cGroup":["redKO"]},{"v0":10,"v1":11,"trait":"kickOffBarrier"},{"vis":false,"color":"FFCCCC","bCoef":1,"trait":"ballArea","v0":24,"v1":25,"cMask":["ball"],"x":385},{"vis":false,"color":"CCCCFF","bCoef":1,"trait":"ballArea","v0":26,"v1":27,"x":385,"cMask":["ball"]},{"vis":false,"color":"FFCCCC","bCoef":1,"cMask":["ball"],"trait":"ballArea","v0":28,"v1":29,"x":-385,"curve":0},{"vis":false,"color":"FFCCCC","bCoef":1,"cMask":["ball"],"trait":"ballArea","v0":30,"v1":31,"x":-385},{"vis":false,"color":"FFCCCC","bCoef":1,"cMask":["ball"],"trait":"ballArea","v0":31,"v1":31},{"vis":false,"color":"FFCCCC","bCoef":1,"cMask":["ball"],"trait":"ballArea","v0":32,"v1":33,"x":-385,"curve":-38.6025768017},{"vis":false,"color":"FFCCCC","bCoef":1,"cMask":["ball"],"trait":"ballArea","v0":34,"v1":35,"x":-385,"curve":31.9608748015},{"vis":false,"color":"FFCCCC","bCoef":1,"cMask":["ball"],"trait":"ballArea","v0":36,"v1":37,"x":-385,"curve":-55.0670963503},{"vis":false,"color":"FFCCCC","bCoef":1,"cMask":["ball"],"trait":"ballArea","v0":38,"v1":39,"x":-385,"curve":30.1056948262},{"vis":false,"color":"CCCCFF","bCoef":1,"trait":"ballArea","v0":40,"v1":41,"x":385,"cMask":["ball"],"curve":48.8016671394},{"vis":false,"color":"CCCCFF","bCoef":1,"trait":"ballArea","v0":42,"v1":43,"x":385,"cMask":["ball"],"curve":-34.5238570872},{"vis":false,"color":"FFCCCC","bCoef":1,"trait":"ballArea","v0":44,"v1":45,"cMask":["ball"],"x":385,"curve":43.4541918718},{"vis":false,"color":"FFCCCC","bCoef":1,"trait":"ballArea","v0":46,"v1":47,"cMask":["ball"],"x":385,"curve":-35.5522115092}],"goals":[{"p0":[-376,65],"p1":[-376,-63],"team":"red"},{"p0":[377,63],"p1":[377,-65],"team":"blue","_selected":true}],"discs":[{"pos":[-370,64],"trait":"goalPost","color":"FFCCCC","bCoef":0.5},{"pos":[-370,-64],"trait":"goalPost","color":"FFCCCC"},{"pos":[370,64],"trait":"goalPost","color":"CCCCFF"},{"pos":[370,-64],"trait":"goalPost","color":"CCCCFF"}],"planes":[{"normal":[0,1],"dist":-170,"trait":"ballArea"},{"normal":[0,-1],"dist":-170,"trait":"ballArea"},{"normal":[0,1],"dist":-200,"bCoef":0.1},{"normal":[0,-1],"dist":-200,"bCoef":0.1},{"normal":[1,0],"dist":-420,"bCoef":0.1},{"normal":[-1,0],"dist":-420,"bCoef":0.1}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}}}',
	'POWER BIG': '{"name":"Power Big - (GolMaps.blogspot.com)","width":600,"height":270,"bg":{"type":"grass","width":550,"height":240,"kickOffRadius":80},"vertexes":[{"x":-550,"y":240,"cMask":["ball"],"cGroup":["all"]},{"x":-550,"y":80,"cMask":["ball"],"cGroup":["all"]},{"x":-550,"y":-80,"cMask":["ball"]},{"x":-550,"y":-240,"cMask":["ball"]},{"x":550,"y":240,"cMask":["ball"]},{"x":550,"y":80,"cMask":["ball"]},{"x":550,"y":-80,"cMask":["ball"]},{"x":550,"y":-240,"cMask":["ball"]},{"x":0,"y":270,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-270,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":-560,"y":-80,"bCoef":0.1,"cMask":["ball"]},{"x":-580,"y":-60,"bCoef":0.1,"cMask":["ball"]},{"x":-580,"y":60,"bCoef":0.1,"cMask":["ball"]},{"x":-560,"y":80,"bCoef":0.1,"cMask":["ball"]},{"x":560,"y":-80,"bCoef":0.1,"cMask":["ball"]},{"x":580,"y":-60,"bCoef":0.1,"cMask":["ball"]},{"x":580,"y":60,"bCoef":0.1,"cMask":["ball"]},{"x":560,"y":80,"bCoef":0.1,"cMask":["ball"]},{"x":565,"y":80,"cMask":["ball"]},{"x":565,"y":240,"cMask":["ball"]},{"x":565,"y":-240,"cMask":["ball"]},{"x":565,"y":-80,"cMask":["ball"]},{"x":-565,"y":-240,"cMask":["ball"]},{"x":-565,"y":-80,"cMask":["ball"]},{"x":-565,"y":80,"cMask":["ball"]},{"x":-565,"y":240,"cMask":["ball"]}],"segments":[{"v0":0,"v1":1,"vis":false,"cMask":["ball"],"cGroup":["all"]},{"v0":2,"v1":3,"vis":false,"cMask":["ball"]},{"v0":4,"v1":5,"vis":false,"cMask":["ball"]},{"v0":6,"v1":7,"vis":false,"cMask":["ball"]},{"v0":13,"v1":12,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":13,"v1":14,"bCoef":0.1,"cMask":["ball"]},{"v0":15,"v1":14,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":16,"v1":17,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":17,"v1":18,"bCoef":0.1,"cMask":["ball"]},{"v0":18,"v1":19,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":8,"v1":9,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":9,"v1":10,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["blueKO"]},{"v0":10,"v1":9,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["redKO"]},{"v0":10,"v1":11,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":20,"v1":21,"vis":false,"cMask":["ball"],"color":"CCCCFF"},{"v0":22,"v1":23,"vis":false,"cMask":["ball"],"color":"CCCCFF"},{"v0":24,"v1":25,"vis":false,"cMask":["ball"],"color":"CCCCFF"},{"v0":26,"v1":27,"vis":false,"cMask":["ball"],"color":"FFCCCC"}],"planes":[{"normal":[0,1],"dist":-240,"cMask":["ball"]},{"normal":[0,-1],"dist":-240,"cMask":["ball"]},{"normal":[0,1],"dist":-270,"bCoef":0.1},{"normal":[0,-1],"dist":-270,"bCoef":0.1},{"normal":[1,0],"dist":-600,"bCoef":0.1},{"normal":[-1,0],"dist":-600,"bCoef":0.1}],"goals":[{"p0":[-550,80],"p1":[-550,-80],"team":"red"},{"p0":[550,80],"p1":[550,-80],"team":"blue"}],"discs":[{"cGroup":["ball","kick","score"]},{"pos":[-550,80],"radius":8,"invMass":0,"color":"FFCCCC"},{"pos":[-550,-80],"radius":8,"invMass":0,"color":"FFCCCC"},{"pos":[550,80],"radius":8,"invMass":0,"color":"CCCCFF"},{"pos":[550,-80],"radius":8,"invMass":0,"color":"CCCCFF"},{"pos":[-286.0217704772949,-9986.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-286.0217704772949,-9971.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-285.0217704772949,-9931.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-240.02177047729492,-9932.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-240.02177047729492,-9962.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-254.02177047729492,-9962.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-286.0217704772949,-10000.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-256.0217704772949,-10000.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-240.02177047729492,-9999.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-208.02177047729492,-9981.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-208.02177047729492,-9965.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-207.02177047729492,-9931.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-192.02177047729492,-9931.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-162.02177047729492,-9932.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-162.02177047729492,-9962.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-161.02177047729492,-9981.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-208.02177047729492,-10000.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-175.02177047729492,-10000.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-161.02177047729492,-10001.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-103.02177047729492,-9932.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-35.02177047729492,-9932.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-35.02177047729492,-9962.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-35.02177047729492,-9977.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-58.02177047729492,-9980.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-35.02177047729492,-10003.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-11.021770477294922,-9978.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-11.021770477294922,-9961.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-10.021770477294922,-9932.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[11.978229522705078,-9963.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[34.97822952270508,-9933.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[34.97822952270508,-9963.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[35.97822952270508,-9980.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-3.021770477294922,-9992.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[10.978229522705078,-10004.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[23.978229522705078,-9993.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[57.97822952270508,-9973.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[57.97822952270508,-9957.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[58.97822952270508,-9933.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[102.97822952270508,-9974.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[72.97822952270508,-9960.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[100.97822952270508,-9993.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[57.97822952270508,-10002.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[71.97822952270508,-10003.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[124.97822952270508,-9973.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[161.97822952270508,-9949.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[125.97822952270508,-9931.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[141.97822952270508,-9930.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[157.97822952270508,-9937.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[157.97822952270508,-9961.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[139.97822952270508,-9966.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[124.97822952270508,-10001.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[139.97822952270508,-10004.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[160.97822952270508,-10001.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[120.97822952270508,-9986.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-240.02177047729492,-9947.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-162.02177047729492,-9948.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-208.02177047729492,-9949.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-71.02177047729492,-9990.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-46.02177047729492,-9991.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-0.021770477294921875,-9962.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[22.978229522705078,-9963.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-11.021770477294922,-9947.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[34.97822952270508,-9949.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[57.97822952270508,-9988.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[58.97822952270508,-9944.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[90.97822952270508,-9964.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[88.97822952270508,-10003.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-35.02177047729492,-9948.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[184.97822952270508,-9931.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"FF0000","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-176.02177047729492,-9931.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-192.02177047729492,-10000.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-270.0217704772949,-10000.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-255.02177047729492,-9931.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-269.0217704772949,-9931.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-286.0217704772949,-9957.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-286.0217704772949,-9944.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-131.02177047729492,-9987.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-131.02177047729492,-9972.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-130.02177047729492,-9932.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-131.02177047729492,-10001.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-131.02177047729492,-9958.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-131.02177047729492,-9945.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-117.02177047729492,-9932.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-35.02177047729492,-9990.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-80.02177047729492,-9932.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-81.02177047729492,-9962.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-81.02177047729492,-9977.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-81.02177047729492,-10003.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-81.02177047729492,-9948.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-81.02177047729492,-9990.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"7BFF","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[251.97822952270508,-9932.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[251.97822952270508,-9962.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[251.97822952270508,-9977.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[228.97822952270508,-9980.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[251.97822952270508,-10003.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[215.97822952270508,-9990.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[240.97822952270508,-9991.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[251.97822952270508,-9948.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[251.97822952270508,-9990.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[206.97822952270508,-9932.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[205.97822952270508,-9962.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[205.97822952270508,-9977.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[205.97822952270508,-10003.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[205.97822952270508,-9948.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[205.97822952270508,-9990.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[300.9782295227051,-9932.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[272.9782295227051,-9987.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[272.9782295227051,-9972.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[273.9782295227051,-9932.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[272.9782295227051,-10001.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[272.9782295227051,-9958.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[272.9782295227051,-9945.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[286.9782295227051,-9932.01163482666],"speed":[0,2],"radius":5,"bCoef":0.1,"invMass":1000,"damping":1,"color":"363636","cMask":["red","blue"],"cGroup":["wall"]}],"playerPhysics":{"acceleration":0.12,"kickingAcceleration":0.12,"kickStrength":11},"ballPhysics":"disc0","spawnDistance":350}',
	'POWERBALL SPLIT 3': '{"name":"Powerball (Split in Three) by Galactic Boy","width":420,"height":370,"bg":{"type":"grass","width":370,"height":330,"kickOffRadius":55},"vertexes":[{"x":-370,"y":-110,"bCoef":0,"cMask":["red","blue"]},{"x":370,"y":-110,"bCoef":0,"cMask":["red","blue"]},{"x":-370,"y":110,"bCoef":0,"cMask":["red","blue"]},{"x":370,"y":110,"bCoef":0,"cMask":["red","blue"]},{"x":-420,"y":-110,"bCoef":0,"cMask":["blue"]},{"x":-420,"y":110,"bCoef":0,"cMask":["blue"]},{"x":420,"y":-110,"bCoef":0,"cMask":["red"]},{"x":420,"y":110,"bCoef":0,"cMask":["red"]},{"x":-370,"y":-330,"cMask":["ball"]},{"x":-370,"y":-275,"cMask":["ball"]},{"x":370,"y":-330,"cMask":["ball"]},{"x":370,"y":-275,"cMask":["ball"]},{"x":-370,"y":330,"cMask":["ball"]},{"x":-370,"y":275,"cMask":["ball"]},{"x":370,"y":330,"cMask":["ball"]},{"x":370,"y":275,"cMask":["ball"]},{"x":-370,"y":-165,"cMask":["ball"]},{"x":-370,"y":-55,"cMask":["ball"]},{"x":370,"y":-165,"cMask":["ball"]},{"x":370,"y":-55,"cMask":["ball"]},{"x":-370,"y":165,"cMask":["ball"]},{"x":-370,"y":55,"cMask":["ball"]},{"x":370,"y":165,"cMask":["ball"]},{"x":370,"y":55,"cMask":["ball"]},{"x":-385,"y":-330,"cMask":["ball"]},{"x":-385,"y":-270.98076211353,"cMask":["ball"]},{"x":385,"y":-330,"cMask":["ball"]},{"x":385,"y":-270.98076211353,"cMask":["ball"]},{"x":-385,"y":330,"cMask":["ball"]},{"x":-385,"y":270.98076211353,"cMask":["ball"]},{"x":385,"y":330,"cMask":["ball"]},{"x":385,"y":270.98076211353,"cMask":["ball"]},{"x":-385,"y":-169.01923788647,"cMask":["ball"]},{"x":-385,"y":-50.980762113533,"cMask":["ball"]},{"x":385,"y":-169.01923788647,"cMask":["ball"]},{"x":385,"y":-50.980762113533,"cMask":["ball"]},{"x":-385,"y":169.01923788647,"cMask":["ball"]},{"x":-385,"y":50.980762113533,"cMask":["ball"]},{"x":385,"y":169.01923788647,"cMask":["ball"]},{"x":385,"y":50.980762113533,"cMask":["ball"]},{"x":-370,"y":-165,"bCoef":0.1,"cMask":["ball"]},{"x":-400,"y":-195,"bCoef":0.1,"cMask":["ball"]},{"x":370,"y":-165,"bCoef":0.1,"cMask":["ball"]},{"x":400,"y":-195,"bCoef":0.1,"cMask":["ball"]},{"x":-370,"y":165,"bCoef":0.1,"cMask":["ball"]},{"x":-400,"y":195,"bCoef":0.1,"cMask":["ball"]},{"x":370,"y":165,"bCoef":0.1,"cMask":["ball"]},{"x":400,"y":195,"bCoef":0.1,"cMask":["ball"]},{"x":-400,"y":-245,"bCoef":0.1,"cMask":["ball"]},{"x":-370,"y":-275,"bCoef":0.1,"cMask":["ball"]},{"x":400,"y":-245,"bCoef":0.1,"cMask":["ball"]},{"x":370,"y":-275,"bCoef":0.1,"cMask":["ball"]},{"x":-400,"y":245,"bCoef":0.1,"cMask":["ball"]},{"x":-370,"y":275,"bCoef":0.1,"cMask":["ball"]},{"x":400,"y":245,"bCoef":0.1,"cMask":["ball"]},{"x":370,"y":275,"bCoef":0.1,"cMask":["ball"]},{"x":-370,"y":55,"bCoef":0.1,"cMask":["ball"]},{"x":-400,"y":25,"bCoef":0.1,"cMask":["ball"]},{"x":370,"y":55,"bCoef":0.1,"cMask":["ball"]},{"x":400,"y":25,"bCoef":0.1,"cMask":["ball"]},{"x":-370,"y":-55,"bCoef":0.1,"cMask":["ball"]},{"x":-400,"y":-25,"bCoef":0.1,"cMask":["ball"]},{"x":370,"y":-55,"bCoef":0.1,"cMask":["ball"]},{"x":400,"y":-25,"bCoef":0.1,"cMask":["ball"]},{"x":0,"y":-370,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-55,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":370,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":55,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":-10,"y":-20,"cMask":[],"cGroup":[]},{"x":-35,"y":-20,"cMask":[],"cGroup":[]},{"x":-35,"y":20,"cMask":[],"cGroup":[]},{"x":-10,"y":20,"cMask":[],"cGroup":[]},{"x":-10,"y":0,"cMask":[],"cGroup":[]},{"x":-22.5,"y":0,"cMask":[],"cGroup":[]},{"x":10,"y":20,"cMask":[],"cGroup":[]},{"x":10,"y":-20,"cMask":[],"cGroup":[]},{"x":25,"y":-20,"cMask":[],"cGroup":[]},{"x":10,"y":0,"cMask":[],"cGroup":[]},{"x":25,"y":0,"cMask":[],"cGroup":[]},{"x":25,"y":20,"cMask":[],"cGroup":[]}],"segments":[{"v0":0,"v1":1,"bCoef":0,"cMask":["red","blue"],"color":"C7E6BD"},{"v0":2,"v1":3,"bCoef":0,"cMask":["red","blue"],"color":"C7E6BD"},{"v0":0,"v1":4,"bCoef":0,"vis":false,"cMask":["blue"]},{"v0":2,"v1":5,"bCoef":0,"vis":false,"cMask":["blue"]},{"v0":1,"v1":6,"bCoef":0,"vis":false,"cMask":["red"]},{"v0":3,"v1":7,"bCoef":0,"vis":false,"cMask":["red"]},{"v0":8,"v1":9,"vis":false,"cMask":["ball"]},{"v0":10,"v1":11,"vis":false,"cMask":["ball"]},{"v0":12,"v1":13,"vis":false,"cMask":["ball"]},{"v0":14,"v1":15,"vis":false,"cMask":["ball"]},{"v0":16,"v1":17,"vis":false,"cMask":["ball"]},{"v0":18,"v1":19,"vis":false,"cMask":["ball"]},{"v0":20,"v1":21,"vis":false,"cMask":["ball"]},{"v0":22,"v1":23,"vis":false,"cMask":["ball"]},{"v0":24,"v1":25,"vis":false,"cMask":["ball"]},{"v0":26,"v1":27,"vis":false,"cMask":["ball"]},{"v0":28,"v1":29,"vis":false,"cMask":["ball"]},{"v0":30,"v1":31,"vis":false,"cMask":["ball"]},{"v0":32,"v1":33,"vis":false,"cMask":["ball"]},{"v0":34,"v1":35,"vis":false,"cMask":["ball"]},{"v0":36,"v1":37,"vis":false,"cMask":["ball"]},{"v0":38,"v1":39,"vis":false,"cMask":["ball"]},{"v0":40,"v1":41,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":43,"v1":42,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":45,"v1":44,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":46,"v1":47,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":48,"v1":49,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":51,"v1":50,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":53,"v1":52,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":54,"v1":55,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":56,"v1":57,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":59,"v1":58,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":61,"v1":60,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":62,"v1":63,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":48,"v1":41,"bCoef":0.1,"cMask":["ball"]},{"v0":50,"v1":43,"bCoef":0.1,"cMask":["ball"]},{"v0":52,"v1":45,"bCoef":0.1,"cMask":["ball"]},{"v0":54,"v1":47,"bCoef":0.1,"cMask":["ball"]},{"v0":61,"v1":57,"bCoef":0.1,"cMask":["ball"]},{"v0":63,"v1":59,"bCoef":0.1,"cMask":["ball"]},{"v0":64,"v1":65,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":66,"v1":67,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":67,"v1":65,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["blueKO"]},{"v0":65,"v1":67,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["redKO"]},{"v0":68,"v1":69,"cMask":[],"cGroup":[],"color":"C7E6BD"},{"v0":69,"v1":70,"cMask":[],"cGroup":[],"color":"C7E6BD"},{"v0":70,"v1":71,"cMask":[],"cGroup":[],"color":"C7E6BD"},{"v0":71,"v1":72,"cMask":[],"cGroup":[],"color":"C7E6BD"},{"v0":72,"v1":73,"cMask":[],"cGroup":[],"color":"C7E6BD"},{"v0":74,"v1":75,"cMask":[],"cGroup":[],"color":"C7E6BD"},{"v0":75,"v1":76,"cMask":[],"cGroup":[],"color":"C7E6BD"},{"v0":77,"v1":78,"cMask":[],"cGroup":[],"color":"C7E6BD"},{"v0":74,"v1":79,"cMask":[],"cGroup":[],"color":"C7E6BD"},{"v0":76,"v1":78,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"cGroup":[],"color":"C7E6BD"},{"v0":78,"v1":79,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"cGroup":[],"color":"C7E6BD"}],"planes":[{"normal":[0,1],"dist":-330,"cMask":["ball"]},{"normal":[0,-1],"dist":-330,"cMask":["ball"]},{"normal":[1,0],"dist":-400,"bCoef":0.1,"cMask":["ball"]},{"normal":[-1,0],"dist":-400,"bCoef":0.1,"cMask":["ball"]},{"normal":[0,1],"dist":-370,"bCoef":0,"cMask":["red","blue"]},{"normal":[0,-1],"dist":-370,"bCoef":0,"cMask":["red","blue"]},{"normal":[1,0],"dist":-420,"bCoef":0,"cMask":["red","blue"]},{"normal":[-1,0],"dist":-420,"bCoef":0,"cMask":["red","blue"]}],"goals":[{"p0":[-370,-275],"p1":[-370,-165],"team":"red"},{"p0":[370,-275],"p1":[370,-165],"team":"blue"},{"p0":[-370,165],"p1":[-370,275],"team":"red"},{"p0":[370,165],"p1":[370,275],"team":"blue"},{"p0":[-370,-55],"p1":[-370,55],"team":"red"},{"p0":[370,-55],"p1":[370,55],"team":"blue"}],"discs":[{"cGroup":["ball","kick","score"]},{"pos":[-370,-275],"radius":8,"invMass":0,"damping":0,"color":"FFCCCC","cMask":["red","blue","ball"]},{"pos":[370,-275],"radius":8,"invMass":0,"damping":0,"color":"CCCCFF","cMask":["red","blue","ball"]},{"pos":[-370,275],"radius":8,"invMass":0,"damping":0,"color":"FFCCCC","cMask":["red","blue","ball"]},{"pos":[370,275],"radius":8,"invMass":0,"damping":0,"color":"CCCCFF","cMask":["red","blue","ball"]},{"pos":[-370,-165],"radius":8,"invMass":0,"damping":0,"color":"FFCCCC","cMask":["red","blue","ball"]},{"pos":[370,-165],"radius":8,"invMass":0,"damping":0,"color":"CCCCFF","cMask":["red","blue","ball"]},{"pos":[-370,165],"radius":8,"invMass":0,"damping":0,"color":"FFCCCC","cMask":["red","blue","ball"]},{"pos":[370,165],"radius":8,"invMass":0,"damping":0,"color":"CCCCFF","cMask":["red","blue","ball"]},{"pos":[-370,-55],"radius":8,"invMass":0,"damping":0,"color":"FFCCCC","cMask":["red","blue","ball"]},{"pos":[370,-55],"radius":8,"invMass":0,"damping":0,"color":"CCCCFF","cMask":["red","blue","ball"]},{"pos":[-370,55],"radius":8,"invMass":0,"damping":0,"color":"FFCCCC","cMask":["red","blue","ball"]},{"pos":[370,55],"radius":8,"invMass":0,"damping":0,"color":"CCCCFF","cMask":["red","blue","ball"]}],"playerPhysics":{"kickStrength":13},"ballPhysics":"disc0","spawnDistance":395}',

	'HANDBALL 3V3': '{"name":"MINI HANDBALL 3v3","width":515,"height":270,"bg":{"type":"hockey"},"vertexes":[{"x":-454.30927154489,"y":-214.93895218641,"cMask":["ball"]},{"x":454.54686548774,"y":-215.01963724828,"cMask":["ball"]},{"x":-454.22858648302,"y":217.33507256156,"cMask":["ball"]},{"x":453.54686548774,"y":218.41575762343,"cMask":["ball"]},{"x":-454.22858648302,"y":-89.579485009501,"cMask":["ball"]},{"x":454.54686548774,"y":98.975605384651,"cMask":["ball"]},{"x":-455.22858648302,"y":96.975605384651,"cMask":["ball"]},{"x":-0.3408604976404499,"y":-212.77758206267,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["blueKO"]},{"x":-0.3408604976404499,"y":215.17370243783,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["blueKO"]},{"x":-0.3408604976404499,"y":-43.110027349093,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO"]},{"x":-0.3408604976404499,"y":43.344777600503,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":-452.06721635928,"y":143.84848835441,"cMask":["blue"],"cGroup":["blue"]},{"x":-318.06226868741,"y":49.828887971723,"cMask":["red","blue"],"cGroup":["red","blue"]},{"x":451.385495364,"y":143.84848835441,"cMask":["red"],"cGroup":["red"]},{"x":317.38054769212,"y":49.828887971723,"cMask":["red","blue"],"cGroup":["red","blue"]},{"x":-452.06721635928,"y":-141.45236797926,"cMask":["blue"],"cGroup":["blue"]},{"x":-318.06226868741,"y":-47.432767596573,"cMask":["red","blue"],"cGroup":["red","blue"]},{"x":451.385495364,"y":-141.45236797926,"cMask":["red"],"cGroup":["red"]},{"x":317.38054769212,"y":-47.432767596573,"cMask":["red","blue"],"cGroup":["red","blue"]},{"x":-452.06721635928,"y":182.75315058173,"cMask":["blue"],"cGroup":["blueKO"]},{"x":-276.99623633635,"y":55.232313281073,"cMask":["blue"],"cGroup":["blueKO"]},{"x":451.385495364,"y":182.75315058173,"cMask":["red"],"cGroup":["redKO"]},{"x":276.31451534107,"y":55.232313281073,"cMask":["red"],"cGroup":["redKO"]},{"x":-452.06721635928,"y":-180.35703020658,"cMask":["blue"],"cGroup":["blueKO"]},{"x":-276.99623633635,"y":-52.836192905922,"cMask":["blue"],"cGroup":["blueKO"]},{"x":451.385495364,"y":-180.35703020658,"cMask":["red"],"cGroup":["redKO"]},{"x":276.31451534107,"y":-52.836192905922,"cMask":["red"],"cGroup":["redKO"]},{"x":-298.60993757375,"y":-17.173585864214,"cMask":["blue"],"cGroup":["blueKO"]},{"x":-298.60993757375,"y":20.650391301234,"cMask":["blue"],"cGroup":["blueKO"]},{"x":297.92821657847,"y":-17.173585864214,"cMask":["red"],"cGroup":["redKO"]},{"x":297.92821657847,"y":20.650391301234,"cMask":["red"],"cGroup":["redKO"]},{"x":-458.95475203985,"y":-75.579485009501,"bCoef":0.1,"cMask":["ball"]},{"x":-485.56845327725,"y":-61.481673400882,"bCoef":0.1,"cMask":["ball"]},{"x":456.27303104457,"y":-74.579485009501,"bCoef":0.1,"cMask":["ball"]},{"x":484.88673228197,"y":-61.481673400882,"bCoef":0.1,"cMask":["ball"]},{"x":-460.95475203985,"y":77.975605384651,"bCoef":0.1,"cMask":["ball"]},{"x":-485.56845327725,"y":63.87779377603201,"bCoef":0.1,"cMask":["ball"]},{"x":458.27303104457,"y":79.975605384651,"bCoef":0.1,"cMask":["ball"]},{"x":484.88673228197,"y":63.87779377603201,"bCoef":0.1,"cMask":["ball"]},{"x":454.08720801867,"y":102.78245600335,"cMask":["red"],"cGroup":["redKO"]},{"x":454.08720801867,"y":-94.98291031885,"cMask":["red"],"cGroup":["redKO"]},{"x":-454.76892901395,"y":102.78245600335,"cMask":["blue"],"cGroup":["blueKO"]},{"x":-454.76892901395,"y":-94.98291031885,"cMask":["blue"],"cGroup":["blueKO"]},{"x":0.19948203329454017,"y":218.57712774717,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":-0.3408604976404499,"y":-215.85826712454,"bCoef":0.5,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0.19948203329454017,"y":259.48178997448997,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":-500.15770161249,"y":143.84848835441,"cMask":["blue"],"cGroup":["blue"]},{"x":499.47598061721,"y":143.84848835441,"cMask":["red"],"cGroup":["red"]},{"x":-500.15770161249,"y":-141.45236797926,"cMask":["blue"],"cGroup":["blue"]},{"x":499.47598061721,"y":-141.45236797926,"cMask":["red"],"cGroup":["red"]},{"x":0.19948203329454017,"y":-217.10032231015,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0.19948203329454017,"y":-256.42287225283,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0.19948203329454017,"y":-217.51821002551,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":-455,"y":-95,"cMask":["ball"]},{"x":454,"y":-95,"cMask":["ball"]},{"x":-454,"y":217,"cMask":["ball"]},{"x":454,"y":219,"cMask":["ball"]},{"x":-454,"y":225,"cMask":["ball"]},{"x":454,"y":227,"cMask":["ball"]},{"x":-454.30927154489,"y":-221.93895218641,"cMask":["ball"]},{"x":454.54686548774,"y":-222.01963724828,"cMask":["ball"]},{"x":-461.30927154489,"y":-214.93895218641,"cMask":["ball"]},{"x":-460,"y":-95,"cMask":["ball"]},{"x":-462.22858648302,"y":96.975605384651,"cMask":["ball"]},{"x":-462,"y":217,"cMask":["ball"]},{"x":460.54686548774,"y":98.975605384651,"cMask":["ball"]},{"x":461,"y":219,"cMask":["ball"]},{"x":461.54686548774,"y":-215.01963724828,"cMask":["ball"]},{"x":461,"y":-95,"cMask":["ball"]},{"x":-0.3408604976404499,"y":-43.110027349093,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO"]},{"x":-454.30927154489,"y":-221.93895218641,"bCoef":0,"cMask":["ball"]},{"x":454.54686548774,"y":-222.01963724828,"bCoef":0,"cMask":["ball"]},{"x":461.54686548774,"y":-215.01963724828,"bCoef":0,"cMask":["ball"]},{"x":461.08720801867,"y":-94.98291031885,"bCoef":0,"cMask":["red"],"cGroup":["redKO"]},{"x":460.54686548774,"y":218.41575762343,"bCoef":0,"cMask":["ball"]},{"x":460.54686548774,"y":98.975605384651,"bCoef":0,"cMask":["ball"]},{"x":-454.22858648302,"y":225.33507256156,"bCoef":0,"cMask":["ball"]},{"x":453.54686548774,"y":226.41575762343,"bCoef":0,"cMask":["ball"]},{"x":-462.22858648302,"y":217.33507256156,"bCoef":0,"cMask":["ball"]},{"x":-462.22858648302,"y":96.975605384651,"bCoef":0,"cMask":["ball"]},{"x":-462.30927154489,"y":-214.93895218641,"bCoef":0,"cMask":["ball"]},{"x":-462.76892901395,"y":-94.98291031885,"bCoef":0,"cMask":["blue"],"cGroup":["blueKO"]}],"segments":[{"v0":0,"v1":1,"cMask":["ball"],"color":"FFFFFF"},{"v0":2,"v1":3,"cMask":["ball"],"color":"FFFFFF"},{"v0":12,"v1":11,"curve":85,"curveF":1.0913085010692714,"cMask":["red","blue"],"cGroup":["red","blue"],"color":"B3"},{"v0":13,"v1":14,"curve":85,"curveF":1.0913085010692714,"cMask":["red","blue"],"cGroup":["red","blue"],"color":"B3"},{"v0":15,"v1":16,"curve":85,"curveF":1.0913085010692714,"cMask":["red","blue"],"cGroup":["red","blue"],"color":"B3"},{"v0":18,"v1":17,"curve":85,"curveF":1.0913085010692714,"cMask":["red","blue"],"cGroup":["red","blue"],"color":"B3"},{"v0":16,"v1":12,"cMask":["red","blue"],"cGroup":["red","blue"],"color":"B3"},{"v0":14,"v1":18,"cMask":["red","blue"],"cGroup":["red","blue"],"color":"B3"},{"v0":20,"v1":19,"curve":85,"curveF":1.0913085010692714,"cMask":["blue"],"cGroup":["blueKO"],"color":"FFFFFF"},{"v0":21,"v1":22,"curve":85,"curveF":1.0913085010692714,"cMask":["red"],"cGroup":["redKO"],"color":"FFFFFF"},{"v0":23,"v1":24,"curve":85,"curveF":1.0913085010692714,"cMask":["blue"],"cGroup":["blueKO"],"color":"FFFFFF"},{"v0":26,"v1":25,"curve":85,"curveF":1.0913085010692714,"cMask":["red"],"cGroup":["redKO"],"color":"FFFFFF"},{"v0":24,"v1":20,"cMask":["blue"],"cGroup":["blueKO"],"color":"FFFFFF"},{"v0":22,"v1":26,"cMask":["red"],"cGroup":["redKO"],"color":"FFFFFF"},{"v0":27,"v1":28,"cMask":["blue"],"cGroup":["blueKO"],"color":"FFFFFF"},{"v0":29,"v1":30,"cMask":["red"],"cGroup":["redKO"],"color":"FFFFFF"},{"v0":32,"v1":31,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":33,"v1":34,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":35,"v1":36,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":38,"v1":37,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":32,"v1":36,"bCoef":0.1,"cMask":["ball"]},{"v0":34,"v1":38,"bCoef":0.1,"cMask":["ball"]},{"v0":39,"v1":40,"cMask":["red"],"cGroup":["redKO"],"color":"FFFFFF"},{"v0":41,"v1":42,"cMask":["blue"],"cGroup":["blueKO"],"color":"FFFFFF"},{"v0":43,"v1":10,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["blueKO"],"color":"FFFFFF"},{"v0":43,"v1":10,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"FFFFFF"},{"v0":43,"v1":45,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"FFFFFF"},{"v0":43,"v1":45,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"FFFFFF"},{"v0":2,"v1":6,"cMask":["ball"],"color":"FFFFFF"},{"v0":3,"v1":5,"cMask":["ball"],"color":"FFFFFF"},{"v0":0,"v1":42,"cMask":["ball"],"color":"FFFFFF"},{"v0":1,"v1":40,"cMask":["ball"],"color":"FFFFFF"},{"v0":11,"v1":46,"vis":false,"cMask":["blue"],"cGroup":["blue"],"color":"FFFFFF"},{"v0":13,"v1":47,"vis":false,"cMask":["red"],"cGroup":["red"],"color":"FFFFFF"},{"v0":15,"v1":48,"vis":false,"cMask":["blue"],"cGroup":["blue"],"color":"FFFFFF"},{"v0":17,"v1":49,"vis":false,"cMask":["red"],"cGroup":["red"],"color":"FFFFFF"},{"v0":10,"v1":9,"bCoef":0.5,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue"],"cGroup":["blueKO"],"color":"FFFFFF"},{"v0":9,"v1":10,"bCoef":0.5,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue"],"cGroup":["redKO"],"color":"FFFFFF"},{"v0":9,"v1":50,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"FFFFFF"},{"v0":51,"v1":52,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"FFFFFF"},{"v0":0,"v1":53,"vis":false,"cMask":["ball"],"color":"FFFFFF"},{"v0":1,"v1":54,"vis":false,"cMask":["ball"],"color":"FFFFFF"},{"v0":55,"v1":6,"vis":false,"cMask":["ball"],"color":"FFFFFF"},{"v0":56,"v1":5,"vis":false,"cMask":["ball"],"color":"FFFFFF"},{"v0":55,"v1":56,"vis":false,"cMask":["ball"],"color":"FFFFFF"},{"v0":0,"v1":1,"vis":false,"cMask":["ball"],"color":"FFFFFF"},{"v0":57,"v1":58,"vis":false,"cMask":["ball"],"color":"FFFFFF"},{"v0":59,"v1":60,"vis":false,"cMask":["ball"],"color":"FFFFFF"},{"v0":61,"v1":62,"vis":false,"cMask":["ball"],"color":"FFFFFF"},{"v0":64,"v1":63,"vis":false,"cMask":["ball"],"color":"FFFFFF"},{"v0":66,"v1":65,"vis":false,"cMask":["ball"],"color":"FFFFFF"},{"v0":67,"v1":68,"vis":false,"cMask":["ball"],"color":"FFFFFF"},{"v0":70,"v1":71,"bCoef":0,"cMask":["ball"],"color":"FFFFFF"},{"v0":72,"v1":73,"bCoef":0,"cMask":["ball"],"color":"FFFFFF"},{"v0":74,"v1":75,"bCoef":0,"cMask":["ball"],"color":"FFFFFF"},{"v0":76,"v1":77,"bCoef":0,"cMask":["ball"],"color":"FFFFFF"},{"v0":78,"v1":79,"bCoef":0,"cMask":["ball"],"color":"FFFFFF"},{"v0":80,"v1":81,"bCoef":0,"cMask":["ball"],"color":"FFFFFF"}],"planes":[{"normal":[0,-1],"dist":-260},{"normal":[0,1],"dist":-258},{"normal":[-1,0],"dist":-501.5},{"normal":[1,0],"dist":-502.5}],"goals":[{"p0":[459.16789308054,-80.934004514541],"p1":[459.16789308054,83.330124889691],"team":"blue"},{"p0":[-459.84961407582,83.330124889691],"p1":[-459.84961407582,-80.934004514541],"team":"red"}],"discs":[{"pos":[453.13202209302,-76.704902425811],"radius":8.3989991571223,"invMass":0},{"pos":[-454.97998522155,-76.704902425811],"radius":8.3989991571223,"invMass":0},{"pos":[453.13202209302,80.231047085301],"radius":8.3989991571223,"invMass":0},{"pos":[-452.97998522155,78.231047085301],"radius":8.3989991571223,"invMass":0}],"playerPhysics":{"bCoef":0,"kickStrength":6.1},"ballPhysics":{"radius":7.3,"color":"7CFC00"},"spawnDistance":170}',
	'HANDBALL 4V4': '{"name":"HANDBALL 4v4","width":700,"height":350,"bg":{"type":"hockey"},"vertexes":[{"x":-647,"y":320,"cMask":["ball"]},{"x":-647,"y":94,"cMask":["ball"]},{"x":-647,"y":-96,"cMask":["blue"],"cGroup":["blue"]},{"x":-647,"y":-320,"cMask":["ball"]},{"x":647,"y":320,"cMask":["ball"]},{"x":647,"y":94,"cMask":["red"],"cGroup":["red"]},{"x":647,"y":-96,"cMask":["red"],"cGroup":["red"]},{"x":647,"y":-320,"cMask":["ball"]},{"x":0,"y":350,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-350,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":-655,"y":-101,"bCoef":0.1,"cMask":["ball"]},{"x":-677,"y":-76,"bCoef":0.1,"cMask":["ball"]},{"x":-677,"y":76,"bCoef":0.1,"cMask":["ball"]},{"x":-655,"y":99,"bCoef":0.1,"cMask":["ball"]},{"x":655,"y":-100,"bCoef":0.1,"cMask":["ball"]},{"x":677,"y":-76,"bCoef":0.1,"cMask":["ball"]},{"x":677,"y":76,"bCoef":0.1,"cMask":["ball"]},{"x":655,"y":100,"bCoef":0.1,"cMask":["ball"]},{"x":-647,"y":-215,"cMask":["blue"],"cGroup":["blue"]},{"x":-647,"y":215,"cMask":["red","blue"],"cGroup":["red","blue"]},{"x":-647,"y":-210,"cMask":["red","blue"],"cGroup":["red","blue"]},{"x":-517,"y":-100,"cMask":["red","blue"],"cGroup":["red","blue"]},{"x":-647,"y":210,"cMask":["red","blue"],"cGroup":["red","blue"]},{"x":-517,"y":100,"cMask":["red","blue"],"cGroup":["red","blue"]},{"x":647,"y":215,"cMask":["red"],"cGroup":["red"]},{"x":647,"y":-215,"cMask":["red"],"cGroup":["red"]},{"x":647,"y":210,"cMask":["red","blue"],"cGroup":["red","blue"]},{"x":517,"y":100,"cMask":["red","blue"],"cGroup":["red","blue"]},{"x":647,"y":-210,"cMask":["red","blue"],"cGroup":["red","blue"]},{"x":517,"y":-100,"cMask":["red","blue"],"cGroup":["red","blue"]},{"x":-644.5,"y":104,"cMask":["blue"],"cGroup":["blue"]},{"x":-697,"y":104,"cMask":["blue"],"cGroup":["blue"]},{"x":-647.5,"y":-104,"cMask":["blue"],"cGroup":["blue"]},{"x":-697,"y":-104,"cMask":["blue"],"cGroup":["blue"]},{"x":702,"y":-104,"cMask":["red"],"cGroup":["red"]},{"x":650,"y":-104,"cMask":["red"],"cGroup":["red"]},{"x":702,"y":104,"cMask":["red"],"cGroup":["red"]},{"x":650,"y":104,"cMask":["red"],"cGroup":["red"]},{"x":-647,"y":275,"cMask":["blue"],"cGroup":["blueKO"]},{"x":-453,"y":100,"cMask":["blue"],"cGroup":["blueKO"]},{"x":-647,"y":-275,"cMask":["blue"],"cGroup":["blueKO"]},{"x":-453,"y":-100,"cMask":["blue"],"cGroup":["blueKO"]},{"x":647,"y":-275,"cMask":["red"],"cGroup":["redKO"]},{"x":453,"y":-100,"cMask":["red"],"cGroup":["redKO"]},{"x":647,"y":275,"cMask":["red"],"cGroup":["redKO"]},{"x":453,"y":100,"cMask":["red"],"cGroup":["redKO"]},{"x":-483,"y":-8,"cMask":["blue"],"cGroup":["blueKO"]},{"x":-483,"y":8,"cMask":["blue"],"cGroup":["blueKO"]},{"x":483,"y":-8,"cMask":["red"],"cGroup":["redKO"]},{"x":483,"y":8,"cMask":["red"],"cGroup":["redKO"]}],"segments":[{"v0":0,"v1":1,"cMask":["ball"],"color":"FFFFFF"},{"v0":2,"v1":3,"cMask":["ball"],"color":"FFFFFF"},{"v0":4,"v1":5,"cMask":["ball"],"color":"FFFFFF"},{"v0":6,"v1":7,"cMask":["ball"],"color":"FFFFFF"},{"v0":13,"v1":12,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":14,"v1":13,"bCoef":0.1,"cMask":["ball"]},{"v0":15,"v1":14,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":16,"v1":17,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":17,"v1":18,"bCoef":0.1,"cMask":["ball"]},{"v0":18,"v1":19,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":8,"v1":9,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"FFFFFF"},{"v0":9,"v1":10,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue"],"cGroup":["blueKO"],"color":"FFFFFF"},{"v0":10,"v1":9,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue"],"cGroup":["redKO"],"color":"FFFFFF"},{"v0":10,"v1":11,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"FFFFFF"},{"v0":4,"v1":0,"cMask":["ball"],"color":"FFFFFF"},{"v0":3,"v1":7,"cMask":["ball"],"color":"FFFFFF"},{"v0":2,"v1":1,"cMask":["blue"],"cGroup":["blue"],"color":"FFFFFF"},{"v0":6,"v1":5,"cMask":["red"],"cGroup":["red"],"color":"FFFFFF"},{"v0":22,"v1":23,"curve":85,"curveF":1.0913085010692714,"cMask":["red","blue"],"cGroup":["red","blue"],"color":"B3"},{"v0":25,"v1":24,"curve":85,"curveF":1.0913085010692714,"cMask":["red","blue"],"cGroup":["red","blue"],"color":"B3"},{"v0":23,"v1":25,"cMask":["red","blue"],"cGroup":["red","blue"],"color":"B3"},{"v0":28,"v1":29,"curve":85,"curveF":1.0913085010692714,"cMask":["red","blue"],"cGroup":["red","blue"],"color":"B3"},{"v0":31,"v1":30,"curve":85,"curveF":1.0913085010692714,"cMask":["red","blue"],"cGroup":["red","blue"],"color":"B3"},{"v0":29,"v1":31,"cMask":["red","blue"],"cGroup":["red","blue"],"color":"B3"},{"v0":27,"v1":6,"cMask":["red"],"cGroup":["red"],"color":"FFFFFF"},{"v0":26,"v1":5,"cMask":["red"],"cGroup":["red"],"color":"FFFFFF"},{"v0":21,"v1":1,"cMask":["blue"],"cGroup":["blue"],"color":"FFFFFF"},{"v0":20,"v1":2,"cMask":["blue"],"cGroup":["blue"],"color":"FFFFFF"},{"v0":32,"v1":33,"vis":false,"cMask":["blue"],"cGroup":["blue"],"color":"FFFFFF"},{"v0":34,"v1":35,"vis":false,"cMask":["blue"],"cGroup":["blue"],"color":"FFFFFF"},{"v0":36,"v1":37,"vis":false,"cMask":["red"],"cGroup":["red"],"color":"FFFFFF"},{"v0":38,"v1":39,"vis":false,"cMask":["red"],"cGroup":["red"],"color":"FFFFFF"},{"v0":41,"v1":40,"curve":85,"curveF":1.0913085010692714,"cMask":["blue"],"cGroup":["blueKO"],"color":"FFFFFF"},{"v0":42,"v1":43,"curve":85,"curveF":1.0913085010692714,"cMask":["blue"],"cGroup":["blueKO"],"color":"FFFFFF"},{"v0":43,"v1":41,"cMask":["blue"],"cGroup":["blueKO"],"color":"FFFFFF"},{"v0":45,"v1":44,"curve":85,"curveF":1.0913085010692714,"cMask":["red"],"cGroup":["redKO"],"color":"FFFFFF"},{"v0":46,"v1":47,"curve":85,"curveF":1.0913085010692714,"cMask":["red"],"cGroup":["redKO"],"color":"FFFFFF"},{"v0":47,"v1":45,"cMask":["red"],"cGroup":["redKO"],"color":"FFFFFF"},{"v0":48,"v1":49,"cMask":["blue"],"cGroup":["blueKO"],"color":"FFFFFF"},{"v0":50,"v1":51,"cMask":["red"],"cGroup":["redKO"],"color":"FFFFFF"}],"planes":[{"normal":[0,1],"dist":-320,"cMask":["ball"]},{"normal":[0,-1],"dist":-320,"cMask":["ball"]},{"normal":[0,1],"dist":-354,"bCoef":0.1},{"normal":[0,-1],"dist":-351,"bCoef":0.1},{"normal":[1,0],"dist":-698,"bCoef":0.1},{"normal":[-1,0],"dist":-702,"bCoef":0.1}],"goals":[{"p0":[-656,94],"p1":[-656,-96],"team":"red"},{"p0":[656,96],"p1":[656,-96],"team":"blue"}],"discs":[{"pos":[-647,100],"radius":8,"invMass":0,"color":"FFCCCC"},{"pos":[-647,-100],"radius":8,"invMass":0,"color":"FFCCCC"},{"pos":[647,100],"radius":8,"invMass":0,"color":"CCCCFF"},{"pos":[647,-100],"radius":8,"invMass":0,"color":"CCCCFF"}],"playerPhysics":{"bCoef":0,"kickStrength":6.15},"ballPhysics":{"radius":8.8,"bCoef":0.4,"color":"FFFF00"},"spawnDistance":350}',

	'BOUNCE': '{"name":"SB HaxSB Official Map 3.0","width":900,"height":550,"bg":{"type":"hockey","width":550,"height":240},"vertexes":[{"x":-550,"y":240,"cMask":["ball"]},{"x":-550,"y":80,"cMask":["ball"]},{"x":-550,"y":-80,"cMask":["ball"]},{"x":-550,"y":-240,"cMask":["ball"]},{"x":550,"y":240,"cMask":["ball"]},{"x":550,"y":80,"cMask":["ball"]},{"x":550,"y":-80,"cMask":["ball"]},{"x":550,"y":-240,"cMask":["ball"]},{"x":0,"y":550,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-550,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":-610,"y":-60,"bCoef":0.5,"cMask":["ball"]},{"x":-610,"y":60,"bCoef":0.5,"cMask":["ball"]},{"x":610,"y":-60,"bCoef":0.5,"cMask":["ball"]},{"x":610,"y":60,"bCoef":0.5,"cMask":["ball"]},{"x":0,"y":240,"cMask":[]},{"x":0,"y":-240,"cMask":[]},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":-121,"y":254,"cMask":[]},{"x":-121,"y":300,"cMask":[]},{"x":-87,"y":254,"cMask":[]},{"x":-87,"y":300,"cMask":[]},{"x":-120,"y":278,"cMask":[]},{"x":-88,"y":278,"cMask":[]},{"x":-52,"y":254,"cMask":[]},{"x":-69,"y":300,"cMask":[]},{"x":-35,"y":300,"cMask":[]},{"x":-60,"y":278,"cMask":[]},{"x":-43,"y":278,"cMask":[]},{"x":-17,"y":300,"cMask":[]},{"x":17,"y":254,"cMask":[]},{"x":-17,"y":254,"cMask":[]},{"x":17,"y":300,"cMask":[]},{"x":70,"y":257,"cMask":[]},{"x":38,"y":257,"cMask":[]},{"x":40,"y":277,"cMask":[]},{"x":67,"y":297,"cMask":[]},{"x":35,"y":296,"cMask":[]},{"x":65,"y":277,"cMask":[]},{"x":88,"y":257,"cMask":[]},{"x":88,"y":299,"cMask":[]},{"x":88,"y":277,"cMask":[]},{"x":119,"y":257,"cMask":[]},{"x":119,"y":277,"cMask":[]},{"x":119,"y":299,"cMask":[]}],"segments":[{"v0":17,"v1":19,"cMask":[],"color":"CCCCFF"},{"v0":19,"v1":18,"cMask":[],"color":"6B6B6B"},{"v0":18,"v1":16,"cMask":[],"color":"CCCCFF"},{"v0":1,"v1":2,"cMask":[],"color":"D0D0E8"},{"v0":5,"v1":6,"cMask":[],"color":"D0D0E8"},{"v0":8,"v1":9,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"D0D0E8"},{"v0":9,"v1":10,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue"],"cGroup":["blueKO"],"color":"D0D0E8"},{"v0":10,"v1":9,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue"],"cGroup":["redKO"],"color":"D0D0E8"},{"v0":18,"v1":19,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue"],"cGroup":["blueKO"],"color":"D0D0E8"},{"v0":10,"v1":11,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"D0D0E8"},{"v0":0,"v1":1,"bias":-100,"cMask":["ball"],"color":"D0D0E8"},{"v0":2,"v1":3,"bias":-100,"cMask":["ball"],"color":"D0D0E8"},{"v0":4,"v1":5,"bias":100,"cMask":["ball"],"color":"D0D0E8"},{"v0":6,"v1":7,"bias":100,"cMask":["ball"],"color":"D0D0E8"},{"v0":0,"v1":4,"bias":100,"cMask":["ball"],"color":"D0D0E8"},{"v0":3,"v1":7,"bias":-100,"cMask":["ball"],"color":"D0D0E8"},{"v0":20,"v1":21,"cMask":[],"color":"D0D0E8"},{"v0":22,"v1":23,"cMask":[],"color":"D0D0E8"},{"v0":24,"v1":25,"cMask":[],"color":"D0D0E8"},{"v0":26,"v1":27,"cMask":[],"color":"D0D0E8"},{"v0":26,"v1":28,"cMask":[],"color":"D0D0E8"},{"v0":29,"v1":30,"cMask":[],"color":"D0D0E8"},{"v0":33,"v1":34,"cMask":[],"color":"D0D0E8"},{"v0":31,"v1":32,"cMask":[],"color":"D0D0E8"},{"v0":36,"v1":35,"curve":45.00000000000001,"curveF":2.414213562373095,"cMask":[],"color":"D0D0E8"},{"v0":37,"v1":36,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"D0D0E8"},{"v0":37,"v1":40,"curve":10,"curveF":11.430052302761343,"cMask":[],"color":"D0D0E8"},{"v0":38,"v1":39,"curve":45.00000000000001,"curveF":2.414213562373095,"cMask":[],"color":"D0D0E8"},{"v0":40,"v1":38,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"D0D0E8"},{"v0":41,"v1":42,"cMask":[],"color":"D0D0E8"},{"v0":41,"v1":44,"curve":45.00000000000001,"curveF":2.414213562373095,"cMask":[],"color":"D0D0E8"},{"v0":45,"v1":43,"cMask":[],"color":"D0D0E8"},{"v0":44,"v1":45,"curve":70,"curveF":1.4281480067421146,"cMask":[],"color":"D0D0E8"},{"v0":45,"v1":46,"curve":119.99999999999999,"curveF":0.577350269189626,"cMask":[],"color":"D0D0E8"},{"v0":42,"v1":46,"cMask":[],"color":"D0D0E8"},{"v0":1,"v1":13,"bCoef":0.5,"curve":89.99999999999999,"curveF":1.0000000000000002,"vis":false,"cMask":["ball"],"cGroup":["ball"],"color":"D0D0E8"},{"v0":12,"v1":13,"bCoef":0.5,"vis":false,"cMask":["ball"],"cGroup":["ball"],"color":"D0D0E8"},{"v0":12,"v1":2,"bCoef":0.5,"curve":89.99999999999999,"curveF":1.0000000000000002,"vis":false,"cMask":["ball"],"cGroup":["ball"],"color":"D0D0E8"},{"v0":15,"v1":5,"curve":89.99999999999999,"curveF":1.0000000000000002,"vis":false,"cMask":["ball"],"cGroup":["ball"],"color":"D0D0E8"},{"v0":14,"v1":15,"vis":false,"cMask":["ball"],"cGroup":["ball"],"color":"D0D0E8"},{"v0":6,"v1":14,"curve":89.99999999999999,"curveF":1.0000000000000002,"vis":false,"cMask":["ball"],"cGroup":["ball"],"color":"D0D0E8"}],"planes":[{"normal":[0,1],"dist":-550,"bCoef":0.1},{"normal":[0,-1],"dist":-550,"bCoef":0.1},{"normal":[1,0],"dist":-900,"bCoef":0.1},{"normal":[-1,0],"dist":-900,"bCoef":0.1},{"normal":[0,1],"dist":-247,"cMask":["ball"]},{"normal":[0,-1],"dist":-247,"cMask":["ball"]}],"goals":[{"p0":[-550,80],"p1":[-550,-80],"team":"red"},{"p0":[550,80],"p1":[550,-80],"team":"blue"}],"discs":[{"cGroup":["ball","kick","score"]},{"pos":[-550,80],"radius":8,"invMass":0,"color":"961515"},{"pos":[-550,-80],"radius":8,"invMass":0,"color":"961515"},{"pos":[550,80],"radius":8,"invMass":0,"color":"1E1666"},{"pos":[550,-80],"radius":8,"invMass":0,"color":"1E1666"},{"pos":[-566,76.5],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[-580,74],"radius":0.01,"invMass":0,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[-579.8,61],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[-579.6,48],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[-579.4,36],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[-579.2,24],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[-579,12],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[-578.8,0],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[-579,-12],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[-579.2,-24],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[-579.4,-36],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[-579.6,-48],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[-579.8,-61],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[-580,-74],"radius":0.01,"invMass":0,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[-566,-76.5],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[566,76.5],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[580,74],"radius":0.01,"invMass":0,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[579.8,61],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[579.6,48],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[579.4,36],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[579.2,24],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[579,12],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[578.8,0],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[579,-12],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[579.2,-24],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[579.4,-36],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[579.6,-48],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[579.8,-61],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[580,-74],"radius":0.01,"invMass":0,"damping":0.96,"color":"0","cMask":["ball"]},{"pos":[566,-76.5],"radius":0.01,"invMass":1.5,"damping":0.96,"color":"0","cMask":["ball"]}],"playerPhysics":{"bCoef":1.5,"damping":0.9995,"acceleration":0.025,"kickingAcceleration":0.0175,"kickingDamping":0.9995},"ballPhysics":"disc0","spawnDistance":350,"joints":[{"d0":1,"d1":5,"length":16.3783393541592,"strength":0.1},{"d0":5,"d1":6,"length":14.221462653327892,"strength":0.1},{"d0":6,"d1":7,"length":13.001538370516007,"strength":0.1},{"d0":7,"d1":8,"length":13.001538370516004,"strength":0.1},{"d0":8,"d1":9,"length":12.001666550942,"strength":0.1},{"d0":9,"d1":10,"length":12.001666550941996,"strength":0.1},{"d0":10,"d1":11,"length":12.001666550942,"strength":0.1},{"d0":11,"d1":12,"length":12.001666550942,"strength":0.1},{"d0":12,"d1":13,"length":12.001666550942,"strength":0.1},{"d0":13,"d1":14,"length":12.001666550942,"strength":0.1},{"d0":14,"d1":15,"length":12.001666550941996,"strength":0.1},{"d0":15,"d1":16,"length":12.001666550942,"strength":0.1},{"d0":16,"d1":17,"length":13.001538370516004,"strength":0.1},{"d0":17,"d1":18,"length":13.001538370516007,"strength":0.1},{"d0":18,"d1":19,"length":14.221462653327892,"strength":0.1},{"d0":19,"d1":2,"length":16.3783393541592,"strength":0.1},{"d0":3,"d1":20,"length":16.3783393541592,"strength":0.1},{"d0":20,"d1":21,"length":14.221462653327892,"strength":0.1},{"d0":21,"d1":22,"length":13.001538370516007,"strength":0.1},{"d0":22,"d1":23,"length":13.001538370516004,"strength":0.1},{"d0":23,"d1":24,"length":12.001666550942,"strength":0.1},{"d0":24,"d1":25,"length":12.001666550941996,"strength":0.1},{"d0":25,"d1":26,"length":12.001666550942,"strength":0.1},{"d0":26,"d1":27,"length":12.001666550942,"strength":0.1},{"d0":27,"d1":28,"length":12.001666550942,"strength":0.1},{"d0":28,"d1":29,"length":12.001666550942,"strength":0.1},{"d0":29,"d1":30,"length":12.001666550941996,"strength":0.1},{"d0":30,"d1":31,"length":12.001666550942,"strength":0.1},{"d0":31,"d1":32,"length":13.001538370516004,"strength":0.1},{"d0":32,"d1":33,"length":13.001538370516007,"strength":0.1},{"d0":33,"d1":34,"length":14.221462653327892,"strength":0.1},{"d0":34,"d1":4,"length":16.3783393541592,"strength":0.1}],"redSpawnPoints":[[-350,0],[-350,60],[-350,-60],[-350,120],[-350,-120],[-605,0]],"blueSpawnPoints":[[350,0],[350,60],[350,-60],[350,120],[350,-120],[605,0]]}',
	'SLOWBOUNCE': '{"name":"SlowBounce v2 by MC","width":800,"height":440,"bg":{"type":"grass","width":550,"height":240,"kickOffRadius":80},"vertexes":[{"x":-550,"y":240,"cMask":["ball"]},{"x":-550,"y":80,"cMask":["ball"]},{"x":-550,"y":-80,"cMask":["ball"]},{"x":-550,"y":-240,"cMask":["ball"]},{"x":550,"y":240,"cMask":["ball"]},{"x":550,"y":80,"cMask":["ball"]},{"x":550,"y":-80,"cMask":["ball"]},{"x":550,"y":-240,"cMask":["ball"]},{"x":0,"y":540,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-540,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":-560,"y":-80,"bCoef":0,"cMask":["ball"]},{"x":-580,"y":-60,"bCoef":0,"cMask":["ball"]},{"x":-580,"y":60,"bCoef":0,"cMask":["ball"]},{"x":-560,"y":80,"bCoef":0,"cMask":["ball"]},{"x":560,"y":-80,"bCoef":0,"cMask":["ball"]},{"x":580,"y":-60,"bCoef":0,"cMask":["ball"]},{"x":580,"y":60,"bCoef":0,"cMask":["ball"]},{"x":560,"y":80,"bCoef":0,"cMask":["ball"]}],"segments":[{"v0":0,"v1":1,"vis":false,"cMask":["ball"]},{"v0":2,"v1":3,"vis":false,"cMask":["ball"]},{"v0":4,"v1":5,"vis":false,"cMask":["ball"]},{"v0":6,"v1":7,"vis":false,"cMask":["ball"]},{"v0":13,"v1":12,"bCoef":0,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":13,"v1":14,"bCoef":0,"cMask":["ball"]},{"v0":15,"v1":14,"bCoef":0,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":16,"v1":17,"bCoef":0,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":17,"v1":18,"bCoef":0,"cMask":["ball"]},{"v0":18,"v1":19,"bCoef":0,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":8,"v1":9,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":9,"v1":10,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["blueKO"]},{"v0":10,"v1":9,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["redKO"]},{"v0":10,"v1":11,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]}],"planes":[{"normal":[0,1],"dist":-240,"cMask":["ball"]},{"normal":[0,-1],"dist":-240,"cMask":["ball"]},{"normal":[0,1],"dist":-440,"bCoef":0.1},{"normal":[0,-1],"dist":-440,"bCoef":0.1},{"normal":[1,0],"dist":-800,"bCoef":0.1},{"normal":[-1,0],"dist":-800,"bCoef":0.1}],"goals":[{"p0":[-550,80],"p1":[-550,-80],"team":"red"},{"p0":[550,80],"p1":[550,-80],"team":"blue"}],"discs":[{"radius":8,"bCoef":0.4,"invMass":0.2,"damping":1,"cGroup":["ball","kick","score"]},{"pos":[-550,80],"radius":8,"invMass":0,"color":"0"},{"pos":[-550,-80],"radius":8,"invMass":0,"color":"0"},{"pos":[550,80],"radius":8,"invMass":0,"color":"0"},{"pos":[550,-80],"radius":8,"invMass":0,"color":"0"}],"playerPhysics":{"bCoef":1.5,"invMass":0.2,"damping":0.9995,"acceleration":0.0075,"kickingAcceleration":0.0075,"kickingDamping":0.9995,"kickStrength":12},"ballPhysics":"disc0","spawnDistance":350}',
	'SPACEWRESTLING': '{"name":"SpaceWrestling 2.0","width":880,"height":500,"bg":{"type":"hockey","width":719.5,"height":359.5},"vertexes":[{"x":-650,"y":280,"cMask":["ball"]},{"x":-650,"y":85,"bCoef":0,"cMask":["ball"]},{"x":-650,"y":-85,"bCoef":0,"cMask":["ball"]},{"x":-650,"y":-280,"cMask":["ball"]},{"x":650,"y":280,"cMask":["ball"]},{"x":650,"y":85,"bCoef":0,"cMask":["ball"]},{"x":650,"y":-85,"bCoef":0,"cMask":["ball"]},{"x":650,"y":-280,"cMask":["ball"]},{"x":0,"y":500,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":85,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-85,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-500,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":-676,"y":-65,"bCoef":0,"cMask":["ball"]},{"x":-676,"y":65,"bCoef":0,"cMask":["ball"]},{"x":676,"y":-65,"bCoef":0,"cMask":["ball"]},{"x":676,"y":65,"bCoef":0,"cMask":["ball"]},{"x":-54,"y":332,"cMask":[]},{"x":-54,"y":346.2,"cMask":[]},{"x":-53.5,"y":339.5,"cMask":[]},{"x":-43.5,"y":339.5,"cMask":[]},{"x":-43,"y":346.2,"cMask":[]},{"x":-43,"y":332,"cMask":[]},{"x":-24.5,"y":346.2,"cMask":[]},{"x":-24.5,"y":338,"cMask":[]},{"x":-35.5,"y":338,"cMask":[]},{"x":-35.5,"y":346.2,"cMask":[]},{"x":-35,"y":341,"cMask":[]},{"x":-25,"y":341,"cMask":[]},{"x":14,"y":333,"cMask":[]},{"x":14,"y":346,"cMask":[]},{"x":16.3,"y":346,"cMask":[]},{"x":16.3,"y":333,"cMask":[]},{"x":22,"y":332.8,"cMask":[]},{"x":22,"y":341,"cMask":[]},{"x":25,"y":346,"cMask":[]},{"x":28,"y":346,"cMask":[]},{"x":32,"y":341,"cMask":[]},{"x":32,"y":332.8,"cMask":[]},{"x":38,"y":333,"cMask":[]},{"x":38,"y":346.2,"cMask":[]},{"x":44,"y":333,"cMask":[]},{"x":44,"y":341,"cMask":[]},{"x":38.5,"y":341,"cMask":[]},{"x":-18,"y":333,"cMask":[]},{"x":-7,"y":346,"cMask":[]},{"x":-7,"y":333,"cMask":[]},{"x":-18,"y":346,"cMask":[]},{"x":86.5,"y":333,"cMask":[]},{"x":86.5,"y":346,"cMask":[]},{"x":72.5,"y":346,"cMask":[]},{"x":72.5,"y":344,"cMask":[]},{"x":88.8,"y":346,"cMask":[]},{"x":88.8,"y":333,"cMask":[]},{"x":57,"y":339.5,"cMask":[]},{"x":63,"y":339.5,"cMask":[]},{"x":63,"y":346,"cMask":[]},{"x":57,"y":333,"cMask":[]},{"x":53.5,"y":346,"cMask":[]},{"x":66.5,"y":333,"cMask":[]},{"x":100.5,"y":333,"cMask":[]},{"x":100.5,"y":346,"cMask":[]},{"x":103.8,"y":346,"cMask":[]},{"x":103.8,"y":333,"cMask":[]},{"x":-719,"y":359,"bCoef":0,"cMask":["red","blue"]},{"x":-719,"y":45,"bCoef":-10000,"cMask":["blue"]},{"x":719,"y":359,"bCoef":0,"cMask":["red","blue"]},{"x":719,"y":45,"bCoef":-10000,"cMask":["red"]},{"x":-719,"y":-359,"bCoef":0,"cMask":["red","blue"]},{"x":-719,"y":-45,"bCoef":-10000,"cMask":["blue"]},{"x":719,"y":-359,"bCoef":0,"cMask":["red","blue"]},{"x":719,"y":-45,"bCoef":-10000,"cMask":["red"]},{"x":-1,"y":-360,"cMask":[]},{"x":-1,"y":360,"cMask":[]},{"x":1,"y":-360,"cMask":[]},{"x":1,"y":360,"cMask":[]},{"x":0,"y":-360,"cMask":[]},{"x":0,"y":-85,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":360,"cMask":[]},{"x":0,"y":85,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":-721,"y":-361,"bCoef":0,"cMask":["wall"]},{"x":-721,"y":361,"bCoef":0,"cMask":["wall"]},{"x":721,"y":361,"bCoef":0,"cMask":["wall"]},{"x":721,"y":-361,"bCoef":0,"cMask":["wall"]},{"x":-721,"y":45,"bCoef":0,"cMask":["wall"]},{"x":-721,"y":-45,"bCoef":0,"cMask":["wall"]},{"x":721,"y":-45,"bCoef":0,"cMask":["wall"]},{"x":721,"y":45,"bCoef":0,"cMask":["wall"]},{"x":-650,"y":-290,"bCoef":0.4,"cMask":["red","blue"]},{"x":-590,"y":-350,"bCoef":0.4,"cMask":["red","blue"]},{"x":650,"y":290,"bCoef":0.4,"cMask":["red","blue"]},{"x":590,"y":350,"bCoef":0.4,"cMask":["red","blue"]},{"x":650,"y":-290,"bCoef":0.4,"cMask":["red","blue"]},{"x":590,"y":-350,"bCoef":0.4,"cMask":["red","blue"]},{"x":-650,"y":290,"bCoef":0.4,"cMask":["red","blue"]},{"x":-590,"y":350,"bCoef":0.4,"cMask":["red","blue"]},{"x":-60,"y":359,"bCoef":0.5,"cMask":["red","blue"]},{"x":60,"y":359,"bCoef":0.5,"cMask":["red","blue"]},{"x":-60,"y":-359,"bCoef":0.5,"cMask":["red","blue"]},{"x":60,"y":-359,"bCoef":0.5,"cMask":["red","blue"]},{"x":-775,"y":-45,"bCoef":-10000,"cMask":["red","blue"]},{"x":-730,"y":-110,"bCoef":-10000,"cMask":["red","blue"]},{"x":-780,"y":-175,"bCoef":-10000,"cMask":["red","blue"]},{"x":-780,"y":-280,"bCoef":-10000,"cMask":["blue"]},{"x":-828,"y":-45,"bCoef":-10000,"cMask":["red","blue"]},{"x":-783,"y":-110,"bCoef":-10000,"cMask":["red","blue"]},{"x":-830,"y":-165,"bCoef":-10000,"cMask":["red","blue"]},{"x":-830,"y":-280,"bCoef":-10000,"cMask":["blue"]},{"x":-775,"y":45,"bCoef":-10000,"cMask":["red","blue"]},{"x":-730,"y":110,"bCoef":-10000,"cMask":["red","blue"]},{"x":-780,"y":175,"bCoef":-10000,"cMask":["red","blue"]},{"x":-780,"y":280,"bCoef":-10000,"cMask":["blue"]},{"x":-828,"y":45,"bCoef":-10000,"cMask":["red","blue"]},{"x":-783,"y":110,"bCoef":-10000,"cMask":["red","blue"]},{"x":-830,"y":165,"bCoef":-10000,"cMask":["red","blue"]},{"x":-830,"y":280,"bCoef":-10000,"cMask":["blue"]},{"x":775,"y":-45,"bCoef":-10000,"cMask":["red","blue"]},{"x":730,"y":-110,"bCoef":-10000,"cMask":["red","blue"]},{"x":780,"y":-175,"bCoef":-10000,"cMask":["red","blue"]},{"x":780,"y":-280,"bCoef":-10000,"cMask":["red"]},{"x":828,"y":-45,"bCoef":-10000,"cMask":["red","blue"]},{"x":783,"y":-110,"bCoef":-10000,"cMask":["red","blue"]},{"x":830,"y":-165,"bCoef":-10000,"cMask":["red","blue"]},{"x":830,"y":-280,"bCoef":-10000,"cMask":["red"]},{"x":775,"y":45,"bCoef":-10000,"cMask":["red","blue"]},{"x":730,"y":110,"bCoef":-10000,"cMask":["red","blue"]},{"x":780,"y":175,"bCoef":-10000,"cMask":["red","blue"]},{"x":780,"y":280,"bCoef":-10000,"cMask":["red"]},{"x":828,"y":45,"bCoef":-10000,"cMask":["red","blue"]},{"x":783,"y":110,"bCoef":-10000,"cMask":["red","blue"]},{"x":830,"y":165,"bCoef":-10000,"cMask":["red","blue"]},{"x":830,"y":280,"bCoef":-10000,"cMask":["red"]}],"segments":[{"v0":1,"v1":2,"cMask":[],"color":"7D7D7D"},{"v0":5,"v1":6,"cMask":[],"color":"7D7D7D"},{"v0":8,"v1":9,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"717171"},{"v0":9,"v1":10,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue"],"cGroup":["blueKO"],"color":"676767"},{"v0":10,"v1":9,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue"],"cGroup":["redKO"],"color":"676767"},{"v0":10,"v1":11,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"717171"},{"v0":0,"v1":1,"cMask":["ball"],"color":"555555"},{"v0":2,"v1":3,"cMask":["ball"],"color":"555555"},{"v0":4,"v1":5,"cMask":["ball"],"color":"555555"},{"v0":6,"v1":7,"cMask":["ball"],"color":"555555"},{"v0":12,"v1":13,"bCoef":0,"cMask":["ball"],"color":"535353"},{"v0":14,"v1":15,"bCoef":0,"cMask":["ball"],"color":"535353"},{"v0":1,"v1":13,"bCoef":0,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"],"color":"535353"},{"v0":12,"v1":2,"bCoef":0,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"],"color":"535353"},{"v0":15,"v1":5,"bCoef":0,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"],"color":"535353"},{"v0":6,"v1":14,"bCoef":0,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"],"color":"535353"},{"v0":16,"v1":17,"cMask":[],"color":"B0C0D0"},{"v0":18,"v1":19,"cMask":[],"color":"B0C0D0"},{"v0":20,"v1":21,"cMask":[],"color":"B0C0D0"},{"v0":22,"v1":23,"cMask":[],"color":"B0C0D0"},{"v0":24,"v1":23,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"B0C0D0"},{"v0":24,"v1":25,"cMask":[],"color":"B0C0D0"},{"v0":26,"v1":27,"cMask":[],"color":"B0C0D0"},{"v0":29,"v1":30,"cMask":[],"color":"B0C0D0"},{"v0":28,"v1":31,"cMask":[],"color":"B0C0D0"},{"v0":32,"v1":33,"cMask":[],"color":"B0C0D0"},{"v0":34,"v1":33,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"B0C0D0"},{"v0":34,"v1":35,"cMask":[],"color":"B0C0D0"},{"v0":36,"v1":35,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"B0C0D0"},{"v0":36,"v1":37,"cMask":[],"color":"B0C0D0"},{"v0":38,"v1":39,"cMask":[],"color":"B0C0D0"},{"v0":38,"v1":40,"cMask":[],"color":"B0C0D0"},{"v0":40,"v1":41,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"B0C0D0"},{"v0":41,"v1":42,"cMask":[],"color":"B0C0D0"},{"v0":43,"v1":44,"cMask":[],"color":"B0C0D0"},{"v0":45,"v1":46,"cMask":[],"color":"B0C0D0"},{"v0":48,"v1":47,"curve":-150,"curveF":-0.26794919243112275,"cMask":[],"color":"333333"},{"v0":50,"v1":49,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"333333"},{"v0":48,"v1":51,"cMask":[],"color":"333333"},{"v0":47,"v1":52,"cMask":[],"color":"333333"},{"v0":49,"v1":50,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"333333"},{"v0":53,"v1":54,"cMask":[],"color":"B0C0D0"},{"v0":53,"v1":56,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"B0C0D0"},{"v0":54,"v1":55,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"B0C0D0"},{"v0":29,"v1":28,"curve":-150,"curveF":-0.26794919243112275,"cMask":[],"color":"B0C0D0"},{"v0":55,"v1":57,"cMask":[],"color":"B0C0D0"},{"v0":56,"v1":58,"cMask":[],"color":"B0C0D0"},{"v0":60,"v1":59,"curve":-150,"curveF":-0.26794919243112275,"cMask":[],"color":"333333"},{"v0":60,"v1":61,"cMask":[],"color":"333333"},{"v0":59,"v1":62,"cMask":[],"color":"333333"},{"v0":63,"v1":64,"bias":1,"bCoef":0,"cMask":["red","blue"],"color":"474747"},{"v0":65,"v1":66,"bias":-1,"bCoef":0,"cMask":["red","blue"],"color":"474747"},{"v0":67,"v1":68,"bias":-1,"bCoef":0,"cMask":["red","blue"],"color":"474747"},{"v0":69,"v1":70,"bias":1,"bCoef":0,"cMask":["red","blue"],"color":"474747"},{"v0":68,"v1":64,"bCoef":-10000,"cMask":["blue"],"color":"666666"},{"v0":70,"v1":66,"bCoef":-10000,"cMask":["red"],"color":"666666"},{"v0":71,"v1":72,"cMask":[],"color":"6B6B6B"},{"v0":73,"v1":74,"cMask":[],"color":"6B6B6B"},{"v0":75,"v1":76,"cMask":[],"color":"676767"},{"v0":78,"v1":77,"cMask":[],"color":"676767"},{"v0":63,"v1":65,"bias":-1,"bCoef":0,"cMask":["red","blue"],"color":"474747"},{"v0":69,"v1":67,"bias":-1,"bCoef":0,"cMask":["red","blue"],"color":"474747"},{"v0":80,"v1":81,"bCoef":0,"cMask":["wall"],"color":"474747"},{"v0":82,"v1":79,"bCoef":0,"cMask":["wall"],"color":"474747"},{"v0":80,"v1":83,"bCoef":0,"cMask":["wall"],"color":"474747"},{"v0":83,"v1":84,"bCoef":0,"cMask":["wall"],"color":"666666"},{"v0":84,"v1":79,"bCoef":0,"cMask":["wall"],"color":"474747"},{"v0":82,"v1":85,"bCoef":0,"cMask":["wall"],"color":"474747"},{"v0":85,"v1":86,"bCoef":0,"cMask":["wall"],"color":"555555"},{"v0":86,"v1":81,"bCoef":0,"cMask":["wall"],"color":"474747"},{"v0":88,"v1":87,"bCoef":0.4,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["red","blue"],"color":"474747"},{"v0":87,"v1":88,"bCoef":0.4,"vis":false,"cMask":["red","blue"],"color":"474747"},{"v0":87,"v1":88,"bCoef":0.4,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["red","blue"],"color":"474747"},{"v0":90,"v1":89,"bCoef":0.4,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["red","blue"],"color":"474747"},{"v0":89,"v1":90,"bCoef":0.4,"vis":false,"cMask":["red","blue"],"color":"474747"},{"v0":89,"v1":90,"bCoef":0.4,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["red","blue"],"color":"474747"},{"v0":92,"v1":91,"bCoef":0.4,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["red","blue"],"color":"474747"},{"v0":91,"v1":92,"bCoef":0.4,"vis":false,"cMask":["red","blue"],"color":"474747"},{"v0":91,"v1":92,"bCoef":0.4,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["red","blue"],"color":"474747"},{"v0":94,"v1":93,"bCoef":0.4,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["red","blue"],"color":"474747"},{"v0":93,"v1":94,"bCoef":0.4,"vis":false,"cMask":["red","blue"],"color":"474747"},{"v0":93,"v1":94,"bCoef":0.4,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["red","blue"],"color":"474747"},{"v0":5,"v1":1,"bCoef":0,"cMask":[],"color":"696969"},{"v0":2,"v1":6,"bCoef":0,"cMask":[],"color":"696969"},{"v0":0,"v1":7,"cMask":[],"color":"696969"},{"v0":3,"v1":4,"cMask":[],"color":"696969"},{"v0":0,"v1":4,"cMask":["ball"],"color":"555555"},{"v0":7,"v1":3,"cMask":["ball"],"color":"555555"},{"v0":95,"v1":96,"bCoef":0.5,"cMask":["red","blue"],"color":"343434"},{"v0":97,"v1":98,"bCoef":0.5,"cMask":["red","blue"],"color":"343434"},{"v0":84,"v1":99,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":99,"v1":100,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":100,"v1":101,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":101,"v1":102,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":103,"v1":104,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":104,"v1":105,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":105,"v1":106,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":107,"v1":108,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":108,"v1":109,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":109,"v1":110,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":111,"v1":112,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":112,"v1":113,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":113,"v1":114,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":115,"v1":116,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":116,"v1":117,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":117,"v1":118,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":119,"v1":120,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":120,"v1":121,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":121,"v1":122,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":123,"v1":124,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":124,"v1":125,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":125,"v1":126,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":127,"v1":128,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":128,"v1":129,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":129,"v1":130,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":106,"v1":102,"bCoef":-10000,"curve":180,"curveF":6.123233995736766e-17,"cMask":["blue"],"color":"474747"},{"v0":110,"v1":114,"bCoef":-10000,"curve":180,"curveF":6.123233995736766e-17,"cMask":["blue"],"color":"474747"},{"v0":130,"v1":126,"bCoef":-10000,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red"],"color":"474747"},{"v0":118,"v1":122,"bCoef":-10000,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red"],"color":"474747"},{"v0":83,"v1":107,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":85,"v1":115,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":123,"v1":86,"bCoef":-10000,"cMask":["red","blue"],"color":"474747"},{"v0":64,"v1":83,"bCoef":0,"cMask":["wall"],"color":"474747"},{"v0":68,"v1":84,"bCoef":0,"cMask":["wall"],"color":"474747"},{"v0":66,"v1":86,"bCoef":0,"cMask":["wall"],"color":"474747"},{"v0":70,"v1":85,"bCoef":0,"cMask":["wall"],"color":"474747"},{"v0":65,"v1":81,"bCoef":0,"cMask":["wall"],"color":"474747"},{"v0":63,"v1":80,"bCoef":0,"cMask":["wall"],"color":"474747"},{"v0":67,"v1":79,"bCoef":0,"cMask":["wall"],"color":"474747"},{"v0":69,"v1":82,"bCoef":0,"cMask":["wall"],"color":"474747"},{"v0":103,"v1":111,"curve":50,"curveF":2.1445069205095586,"cMask":["red","blue"],"color":"404040"},{"v0":127,"v1":119,"curve":50,"curveF":2.1445069205095586,"cMask":["red","blue"],"color":"404040"},{"v0":119,"v1":127,"bCoef":-10000,"curve":59.99999999999999,"curveF":1.7320508075688774,"cMask":["red","blue"],"color":"474747"},{"v0":111,"v1":103,"bCoef":-10000,"curve":59.99999999999999,"curveF":1.7320508075688774,"cMask":["red","blue"],"color":"474747"}],"planes":[{"normal":[0,1],"dist":-500,"bCoef":0,"cMask":["red","blue"]},{"normal":[0,-1],"dist":-500,"bCoef":0,"cMask":["red","blue"]},{"normal":[1,0],"dist":-880,"bCoef":0,"cMask":["red","blue"]},{"normal":[-1,0],"dist":-880,"bCoef":0,"cMask":["red","blue"]},{"normal":[0,1],"dist":-287,"cMask":["ball"],"cGroup":["ball"]},{"normal":[0,-1],"dist":-287,"cMask":["ball"],"cGroup":["ball"]},{"normal":[0.9938837346736189,0.11043152607484655],"dist":-682,"cMask":["ball"],"cGroup":["ball"]},{"normal":[0.9938837346736189,-0.11043152607484655],"dist":-682,"cMask":["ball"],"cGroup":["ball"]},{"normal":[-0.9938837346736189,0.11043152607484655],"dist":-682,"cMask":["ball"],"cGroup":["ball"]},{"normal":[-0.9938837346736189,-0.11043152607484655],"dist":-682,"cMask":["ball"],"cGroup":["ball"]},{"normal":[1,0],"dist":-650,"bCoef":0.3,"cMask":["wall"]},{"normal":[-1,0],"dist":-650,"bCoef":0.3,"cMask":["wall"]},{"normal":[0,1],"dist":-280,"bCoef":0.3,"cMask":["wall"]},{"normal":[0,-1],"dist":-280,"bCoef":0.3,"cMask":["wall"]},{"normal":[0,-1],"dist":-280,"bCoef":0.5,"cMask":["wall"],"cGroup":["all"]},{"normal":[0,1],"dist":-280,"bCoef":0.5,"cMask":["wall"],"cGroup":["all"]},{"normal":[1,0],"dist":-650,"bCoef":0.5,"cMask":["wall"],"cGroup":["all"]},{"normal":[-1,0],"dist":-650,"bCoef":0.5,"cMask":["wall"],"cGroup":["all"]},{"normal":[0,1],"dist":-275,"bCoef":0,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"normal":[0,-1],"dist":-275,"bCoef":0,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"normal":[1,0],"dist":-610,"bCoef":0,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"normal":[-1,0],"dist":-620,"bCoef":0,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]}],"goals":[{"p0":[-650,80],"p1":[-650,-80],"team":"red"},{"p0":[650,-80],"p1":[650,80],"team":"blue"}],"discs":[{"pos":[-650,85],"radius":8,"invMass":0,"color":"543636","cMask":["red","blue","ball","wall"],"cGroup":["wall"]},{"pos":[-650,-85],"radius":8,"invMass":0,"color":"543636","cMask":["red","blue","ball","wall"],"cGroup":["wall"]},{"pos":[650,85],"radius":8,"invMass":0,"color":"393654","cMask":["red","blue","ball","wall"],"cGroup":["wall"]},{"pos":[650,-85],"radius":8,"invMass":0,"color":"393654","cMask":["red","blue","ball","wall"],"cGroup":["wall"]},{"pos":[-580,230],"speed":[0.7,-0.7],"radius":12,"bCoef":1.5,"invMass":0.6,"damping":0.999,"color":"8A8A8A","cMask":["red","blue","ball","wall"],"cGroup":["wall"]},{"pos":[-580,-230],"speed":[0.7,0.7],"radius":12,"bCoef":1.5,"invMass":0.6,"damping":0.999,"color":"8A8A8A","cMask":["red","blue","ball","wall"],"cGroup":["wall"]},{"pos":[580,230],"speed":[-0.7,-0.7],"radius":12,"bCoef":1.5,"invMass":0.6,"damping":0.999,"color":"8A8A8A","cMask":["red","blue","ball","wall"],"cGroup":["wall"]},{"pos":[580,-230],"speed":[-0.7,0.7],"radius":12,"bCoef":1.5,"invMass":0.6,"damping":0.999,"color":"8A8A8A","cMask":["red","blue","ball","wall"],"cGroup":["wall"]},{"pos":[-170,-230],"speed":[0,0.2],"radius":12,"bCoef":0.2,"invMass":-0.2,"damping":0.999,"color":"333333","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[170,230],"speed":[0,-0.2],"radius":12,"bCoef":0.2,"invMass":-0.2,"damping":0.999,"color":"333333","cMask":["red","blue"],"cGroup":["wall"]},{"pos":[-385,-225],"speed":[0.4,0.4],"radius":5,"bCoef":1,"invMass":0.06,"damping":1.0017,"color":"111111","cMask":["red","blue"],"cGroup":["wall"]}],"playerPhysics":{"bCoef":1.5,"damping":0.9995,"acceleration":0.025,"kickingAcceleration":0.0175,"kickingDamping":0.9995},"ballPhysics":{},"spawnDistance":350}',
	'ZAWBALL': '{"name":"Enormous Space Iceball by Sand","width":1500,"height":1000,"bg":{"type":"hockey","width":1200,"height":600,"kickOffRadius":220},"vertexes":[{"x":-1200,"y":600,"bCoef":1.5,"cMask":["ball"]},{"x":-1200,"y":110,"bCoef":1.5,"cMask":["ball"]},{"x":-1200,"y":-110,"bCoef":1.5,"cMask":["ball"]},{"x":-1200,"y":-600,"bCoef":1.5,"cMask":["ball"]},{"x":1200,"y":600,"bCoef":1.5,"cMask":["ball"]},{"x":1200,"y":110,"bCoef":1.5,"cMask":["ball"]},{"x":1200,"y":-110,"bCoef":1.5,"cMask":["ball"]},{"x":1200,"y":-600,"bCoef":1.5,"cMask":["ball"]},{"x":0,"y":750,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":220,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-220,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-750,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":1200,"y":350,"cMask":[]},{"x":750,"y":350,"cMask":[]},{"x":1200,"y":-350,"cMask":[]},{"x":750,"y":-350,"cMask":[]},{"x":1200,"y":200,"cMask":[]},{"x":1000,"y":200,"cMask":[]},{"x":1200,"y":-200,"cMask":[]},{"x":1000,"y":-200,"cMask":[]},{"x":750,"y":-190,"cMask":[]},{"x":750,"y":190,"cMask":[]},{"x":-1200,"y":-350,"cMask":[]},{"x":-750,"y":-350,"cMask":[]},{"x":-1200,"y":350,"cMask":[]},{"x":-750,"y":350,"cMask":[]},{"x":-1200,"y":-200,"cMask":[]},{"x":-1000,"y":-200,"cMask":[]},{"x":-1200,"y":200,"cMask":[]},{"x":-1000,"y":200,"cMask":[]},{"x":-750,"y":190,"cMask":[]},{"x":-750,"y":-190,"cMask":[]},{"x":875,"y":4,"cMask":[]},{"x":875,"y":-4,"cMask":[]},{"x":-875,"y":4,"cMask":[]},{"x":-875,"y":-4,"cMask":[]},{"x":-1200,"y":575,"cMask":[]},{"x":-1175,"y":600,"cMask":[]},{"x":-1175,"y":-600,"cMask":[]},{"x":-1200,"y":-575,"cMask":[]},{"x":1175,"y":600,"cMask":[]},{"x":1200,"y":575,"cMask":[]},{"x":1200,"y":-575,"cMask":[]},{"x":1175,"y":-600,"cMask":[]},{"x":-1200,"y":112,"cMask":[]},{"x":-1250,"y":110,"cMask":[]},{"x":-1200,"y":-112,"cMask":[]},{"x":-1250,"y":-110,"cMask":[]},{"x":1200,"y":112,"cMask":[]},{"x":1250,"y":110,"cMask":[]},{"x":1200,"y":-112,"cMask":[]},{"x":1250,"y":-110,"cMask":[]},{"x":0,"y":-4,"cMask":[]},{"x":0,"y":4,"cMask":[]},{"x":0,"y":-4,"cMask":[]},{"x":0,"y":4,"cMask":[]},{"x":-1250,"y":110,"cMask":[]},{"x":-1300,"y":150,"cMask":[]},{"x":-1250,"y":-110,"cMask":[]},{"x":-1300,"y":-150,"cMask":[]},{"x":1250,"y":110,"cMask":[]},{"x":1300,"y":150,"cMask":[]},{"x":1250,"y":-110,"cMask":[]},{"x":1300,"y":-150,"cMask":[]},{"x":-70,"y":700,"cMask":[]},{"x":-70,"y":800,"cMask":[]},{"x":70,"y":700,"cMask":[]},{"x":70,"y":800,"cMask":[]},{"x":-80,"y":700,"cMask":[]},{"x":-80,"y":800,"cMask":[]},{"x":80,"y":700,"cMask":[]},{"x":80,"y":800,"cMask":[]},{"x":-70,"y":700,"cMask":[]},{"x":-80,"y":700,"cMask":[]},{"x":70,"y":700,"cMask":[]},{"x":80,"y":700,"cMask":[]},{"x":-90,"y":710,"cMask":[]},{"x":-90,"y":800,"cMask":[]},{"x":-500,"y":710,"cMask":[]},{"x":-500,"y":800,"cMask":[]},{"x":90,"y":710,"cMask":[]},{"x":90,"y":800,"cMask":[]},{"x":500,"y":710,"cMask":[]},{"x":500,"y":800,"cMask":[]},{"x":-90,"y":700,"cMask":[]},{"x":-90,"y":690,"cMask":[]},{"x":-90,"y":680,"cMask":[]},{"x":-90,"y":670,"cMask":[]},{"x":-90,"y":660,"cMask":[]},{"x":-90,"y":650,"cMask":[]},{"x":-90,"y":640,"cMask":[]},{"x":-90,"y":630,"cMask":[]},{"x":-500,"y":700,"cMask":[]},{"x":-500,"y":690,"cMask":[]},{"x":-500,"y":680,"cMask":[]},{"x":-500,"y":670,"cMask":[]},{"x":-500,"y":660,"cMask":[]},{"x":-500,"y":650,"cMask":[]},{"x":-500,"y":640,"cMask":[]},{"x":-500,"y":630,"cMask":[]},{"x":-500,"y":630,"cMask":[]},{"x":-490,"y":630,"cMask":[]},{"x":-480,"y":630,"cMask":[]},{"x":-470,"y":630,"cMask":[]},{"x":-460,"y":630,"cMask":[]},{"x":-450,"y":630,"cMask":[]},{"x":-440,"y":630,"cMask":[]},{"x":-430,"y":630,"cMask":[]},{"x":-420,"y":630,"cMask":[]},{"x":-410,"y":630,"cMask":[]},{"x":-400,"y":630,"cMask":[]},{"x":-390,"y":630,"cMask":[]},{"x":-380,"y":630,"cMask":[]},{"x":-370,"y":630,"cMask":[]},{"x":-360,"y":630,"cMask":[]},{"x":-350,"y":630,"cMask":[]},{"x":-340,"y":630,"cMask":[]},{"x":-330,"y":630,"cMask":[]},{"x":-320,"y":630,"cMask":[]},{"x":-310,"y":630,"cMask":[]},{"x":-300,"y":630,"cMask":[]},{"x":-290,"y":630,"cMask":[]},{"x":-280,"y":630,"cMask":[]},{"x":-270,"y":630,"cMask":[]},{"x":-260,"y":630,"cMask":[]},{"x":-250,"y":630,"cMask":[]},{"x":-240,"y":630,"cMask":[]},{"x":-230,"y":630,"cMask":[]},{"x":-220,"y":630,"cMask":[]},{"x":-210,"y":630,"cMask":[]},{"x":-200,"y":630,"cMask":[]},{"x":-190,"y":630,"cMask":[]},{"x":-180,"y":630,"cMask":[]},{"x":-170,"y":630,"cMask":[]},{"x":-160,"y":630,"cMask":[]},{"x":-150,"y":630,"cMask":[]},{"x":-140,"y":630,"cMask":[]},{"x":-130,"y":630,"cMask":[]},{"x":-120,"y":630,"cMask":[]},{"x":-110,"y":630,"cMask":[]},{"x":-100,"y":630,"cMask":[]},{"x":-90,"y":630,"cMask":[]},{"x":90,"y":700,"cMask":[]},{"x":90,"y":690,"cMask":[]},{"x":90,"y":680,"cMask":[]},{"x":90,"y":670,"cMask":[]},{"x":90,"y":660,"cMask":[]},{"x":90,"y":650,"cMask":[]},{"x":90,"y":640,"cMask":[]},{"x":90,"y":630,"cMask":[]},{"x":500,"y":700,"cMask":[]},{"x":500,"y":690,"cMask":[]},{"x":500,"y":680,"cMask":[]},{"x":500,"y":670,"cMask":[]},{"x":500,"y":660,"cMask":[]},{"x":500,"y":650,"cMask":[]},{"x":500,"y":640,"cMask":[]},{"x":500,"y":630,"cMask":[]},{"x":500,"y":630,"cMask":[]},{"x":490,"y":630,"cMask":[]},{"x":480,"y":630,"cMask":[]},{"x":470,"y":630,"cMask":[]},{"x":460,"y":630,"cMask":[]},{"x":450,"y":630,"cMask":[]},{"x":440,"y":630,"cMask":[]},{"x":430,"y":630,"cMask":[]},{"x":420,"y":630,"cMask":[]},{"x":410,"y":630,"cMask":[]},{"x":400,"y":630,"cMask":[]},{"x":390,"y":630,"cMask":[]},{"x":380,"y":630,"cMask":[]},{"x":370,"y":630,"cMask":[]},{"x":360,"y":630,"cMask":[]},{"x":350,"y":630,"cMask":[]},{"x":340,"y":630,"cMask":[]},{"x":330,"y":630,"cMask":[]},{"x":320,"y":630,"cMask":[]},{"x":310,"y":630,"cMask":[]},{"x":300,"y":630,"cMask":[]},{"x":290,"y":630,"cMask":[]},{"x":280,"y":630,"cMask":[]},{"x":270,"y":630,"cMask":[]},{"x":260,"y":630,"cMask":[]},{"x":250,"y":630,"cMask":[]},{"x":240,"y":630,"cMask":[]},{"x":230,"y":630,"cMask":[]},{"x":220,"y":630,"cMask":[]},{"x":210,"y":630,"cMask":[]},{"x":200,"y":630,"cMask":[]},{"x":190,"y":630,"cMask":[]},{"x":180,"y":630,"cMask":[]},{"x":170,"y":630,"cMask":[]},{"x":160,"y":630,"cMask":[]},{"x":150,"y":630,"cMask":[]},{"x":140,"y":630,"cMask":[]},{"x":130,"y":630,"cMask":[]},{"x":120,"y":630,"cMask":[]},{"x":110,"y":630,"cMask":[]},{"x":100,"y":630,"cMask":[]},{"x":90,"y":630,"cMask":[]},{"x":0,"y":-610,"cMask":[]},{"x":0,"y":-630,"cMask":[]},{"x":0,"y":-610,"cMask":[]},{"x":0,"y":-630,"cMask":[]},{"x":-12,"y":-610,"cMask":[]},{"x":-12,"y":-630,"cMask":[]},{"x":-25,"y":-610,"cMask":[]},{"x":-12,"y":-620,"cMask":[]},{"x":-25,"y":-630,"cMask":[]},{"x":12,"y":-610,"cMask":[]},{"x":12,"y":-630,"cMask":[]},{"x":25,"y":-610,"cMask":[]},{"x":12,"y":-620,"cMask":[]},{"x":25,"y":-630,"cMask":[]},{"x":0,"y":610,"cMask":[]},{"x":0,"y":630,"cMask":[]},{"x":0,"y":610,"cMask":[]},{"x":0,"y":630,"cMask":[]},{"x":-12,"y":610,"cMask":[]},{"x":-12,"y":630,"cMask":[]},{"x":-25,"y":610,"cMask":[]},{"x":-12,"y":620,"cMask":[]},{"x":-25,"y":630,"cMask":[]},{"x":12,"y":610,"cMask":[]},{"x":12,"y":630,"cMask":[]},{"x":25,"y":610,"cMask":[]},{"x":12,"y":620,"cMask":[]},{"x":25,"y":630,"cMask":[]},{"x":-2,"y":-640,"cMask":[]},{"x":-1,"y":-640,"cMask":[]},{"x":-2,"y":650,"cMask":[]},{"x":-1,"y":650,"cMask":[]},{"x":-8,"y":-640,"cMask":[]},{"x":-8,"y":-650,"cMask":[]},{"x":-8,"y":640,"cMask":[]},{"x":-8,"y":650,"cMask":[]},{"x":8,"y":-640,"cMask":[]},{"x":8,"y":-650,"cMask":[]},{"x":8,"y":640,"cMask":[]},{"x":8,"y":650,"cMask":[]},{"x":4,"y":-643,"cMask":[]},{"x":11,"y":-643,"cMask":[]},{"x":4,"y":647,"cMask":[]},{"x":11,"y":647,"cMask":[]}],"segments":[{"v0":0,"v1":1,"bCoef":1.5,"vis":false,"cMask":["ball"]},{"v0":2,"v1":3,"bCoef":1.5,"vis":false,"cMask":["ball"]},{"v0":4,"v1":5,"bCoef":1.5,"vis":false,"cMask":["ball"]},{"v0":6,"v1":7,"bCoef":1.5,"vis":false,"cMask":["ball"]},{"v0":45,"v1":47,"bCoef":0.1,"curve":10,"curveF":11.430052302761343,"cMask":["red","blue","ball"],"color":"33"},{"v0":51,"v1":49,"bCoef":0.1,"curve":10,"curveF":11.430052302761343,"cMask":["red","blue","ball"],"color":"33"},{"v0":8,"v1":9,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":9,"v1":10,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["blueKO"]},{"v0":10,"v1":9,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["redKO"]},{"v0":10,"v1":11,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":12,"v1":13,"cMask":[],"color":"CCCC"},{"v0":13,"v1":15,"cMask":[],"color":"CCCC"},{"v0":14,"v1":15,"cMask":[],"color":"CCCC"},{"v0":16,"v1":17,"cMask":[],"color":"CCCC"},{"v0":17,"v1":19,"cMask":[],"color":"CCCC"},{"v0":18,"v1":19,"cMask":[],"color":"CCCC"},{"v0":21,"v1":20,"curve":150,"curveF":0.2679491924311227,"cMask":[],"color":"CCCC"},{"v0":22,"v1":23,"cMask":[],"color":"CCCC"},{"v0":23,"v1":25,"cMask":[],"color":"CCCC"},{"v0":24,"v1":25,"cMask":[],"color":"CCCC"},{"v0":26,"v1":27,"cMask":[],"color":"CCCC"},{"v0":27,"v1":29,"cMask":[],"color":"CCCC"},{"v0":28,"v1":29,"cMask":[],"color":"CCCC"},{"v0":31,"v1":30,"curve":150,"curveF":0.2679491924311227,"cMask":[],"color":"CCCC"},{"v0":33,"v1":32,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":35,"v1":34,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":32,"v1":33,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":34,"v1":35,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":32,"v1":33,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"C7E6BD"},{"v0":34,"v1":35,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"C7E6BD"},{"v0":33,"v1":32,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"C7E6BD"},{"v0":35,"v1":34,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"C7E6BD"},{"v0":32,"v1":33,"cMask":[],"color":"C7E6BD"},{"v0":34,"v1":35,"cMask":[],"color":"C7E6BD"},{"v0":36,"v1":37,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"CCCC"},{"v0":38,"v1":39,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"CCCC"},{"v0":40,"v1":41,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"CCCC"},{"v0":42,"v1":43,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"CCCC"},{"v0":44,"v1":45,"bCoef":0.1,"cMask":["red","blue","ball"],"color":"33"},{"v0":47,"v1":46,"bCoef":0.1,"cMask":["red","blue","ball"],"color":"33"},{"v0":49,"v1":48,"bCoef":0.1,"cMask":["red","blue","ball"],"color":"33"},{"v0":50,"v1":51,"bCoef":0.1,"cMask":["red","blue","ball"],"color":"33"},{"v0":53,"v1":52,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":54,"v1":55,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":53,"v1":52,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"C7E6BD"},{"v0":54,"v1":55,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"C7E6BD"},{"v0":56,"v1":57,"cMask":[],"color":"33"},{"v0":58,"v1":59,"cMask":[],"color":"33"},{"v0":60,"v1":61,"cMask":[],"color":"33"},{"v0":62,"v1":63,"cMask":[],"color":"33"},{"v0":64,"v1":65,"cMask":["red","blue"]},{"v0":66,"v1":67,"cMask":["red","blue"]},{"v0":68,"v1":69,"cMask":["red","blue"]},{"v0":70,"v1":71,"cMask":["red","blue"]},{"v0":73,"v1":72,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue"]},{"v0":74,"v1":75,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue"]},{"v0":76,"v1":77,"cMask":[]},{"v0":78,"v1":79,"cMask":[]},{"v0":76,"v1":78,"cMask":[]},{"v0":80,"v1":81,"cMask":[]},{"v0":82,"v1":83,"cMask":[]},{"v0":80,"v1":82,"cMask":[]},{"v0":84,"v1":85,"cMask":[],"color":"C7E6BD"},{"v0":86,"v1":87,"cMask":[],"color":"C7E6BD"},{"v0":88,"v1":89,"cMask":[],"color":"C7E6BD"},{"v0":90,"v1":91,"cMask":[],"color":"C7E6BD"},{"v0":92,"v1":93,"cMask":[],"color":"C7E6BD"},{"v0":94,"v1":95,"cMask":[],"color":"C7E6BD"},{"v0":96,"v1":97,"cMask":[],"color":"C7E6BD"},{"v0":98,"v1":99,"cMask":[],"color":"C7E6BD"},{"v0":100,"v1":101,"cMask":[],"color":"C7E6BD"},{"v0":102,"v1":103,"cMask":[],"color":"C7E6BD"},{"v0":104,"v1":105,"cMask":[],"color":"C7E6BD"},{"v0":106,"v1":107,"cMask":[],"color":"C7E6BD"},{"v0":108,"v1":109,"cMask":[],"color":"C7E6BD"},{"v0":110,"v1":111,"cMask":[],"color":"C7E6BD"},{"v0":112,"v1":113,"cMask":[],"color":"C7E6BD"},{"v0":114,"v1":115,"cMask":[],"color":"C7E6BD"},{"v0":116,"v1":117,"cMask":[],"color":"C7E6BD"},{"v0":118,"v1":119,"cMask":[],"color":"C7E6BD"},{"v0":120,"v1":121,"cMask":[],"color":"C7E6BD"},{"v0":122,"v1":123,"cMask":[],"color":"C7E6BD"},{"v0":124,"v1":125,"cMask":[],"color":"C7E6BD"},{"v0":126,"v1":127,"cMask":[],"color":"C7E6BD"},{"v0":128,"v1":129,"cMask":[],"color":"C7E6BD"},{"v0":130,"v1":131,"cMask":[],"color":"C7E6BD"},{"v0":132,"v1":133,"cMask":[],"color":"C7E6BD"},{"v0":134,"v1":135,"cMask":[],"color":"C7E6BD"},{"v0":136,"v1":137,"cMask":[],"color":"C7E6BD"},{"v0":138,"v1":139,"cMask":[],"color":"C7E6BD"},{"v0":140,"v1":141,"cMask":[],"color":"C7E6BD"},{"v0":142,"v1":143,"cMask":[],"color":"C7E6BD"},{"v0":144,"v1":145,"cMask":[],"color":"C7E6BD"},{"v0":146,"v1":147,"cMask":[],"color":"C7E6BD"},{"v0":148,"v1":149,"cMask":[],"color":"C7E6BD"},{"v0":150,"v1":151,"cMask":[],"color":"C7E6BD"},{"v0":152,"v1":153,"cMask":[],"color":"C7E6BD"},{"v0":154,"v1":155,"cMask":[],"color":"C7E6BD"},{"v0":156,"v1":157,"cMask":[],"color":"C7E6BD"},{"v0":158,"v1":159,"cMask":[],"color":"C7E6BD"},{"v0":160,"v1":161,"cMask":[],"color":"C7E6BD"},{"v0":162,"v1":163,"cMask":[],"color":"C7E6BD"},{"v0":164,"v1":165,"cMask":[],"color":"C7E6BD"},{"v0":166,"v1":167,"cMask":[],"color":"C7E6BD"},{"v0":168,"v1":169,"cMask":[],"color":"C7E6BD"},{"v0":170,"v1":171,"cMask":[],"color":"C7E6BD"},{"v0":172,"v1":173,"cMask":[],"color":"C7E6BD"},{"v0":174,"v1":175,"cMask":[],"color":"C7E6BD"},{"v0":176,"v1":177,"cMask":[],"color":"C7E6BD"},{"v0":178,"v1":179,"cMask":[],"color":"C7E6BD"},{"v0":180,"v1":181,"cMask":[],"color":"C7E6BD"},{"v0":182,"v1":183,"cMask":[],"color":"C7E6BD"},{"v0":184,"v1":185,"cMask":[],"color":"C7E6BD"},{"v0":186,"v1":187,"cMask":[],"color":"C7E6BD"},{"v0":188,"v1":189,"cMask":[],"color":"C7E6BD"},{"v0":190,"v1":191,"cMask":[],"color":"C7E6BD"},{"v0":192,"v1":193,"cMask":[],"color":"C7E6BD"},{"v0":194,"v1":195,"cMask":[],"color":"C7E6BD"},{"v0":196,"v1":197,"cMask":[],"color":"C7E6BD"},{"v0":198,"v1":199,"cMask":[],"color":"C7E6BD"},{"v0":200,"v1":201,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":203,"v1":202,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":204,"v1":205,"cMask":[],"color":"C7E6BD"},{"v0":206,"v1":207,"cMask":[],"color":"C7E6BD"},{"v0":207,"v1":208,"cMask":[],"color":"C7E6BD"},{"v0":209,"v1":210,"cMask":[],"color":"C7E6BD"},{"v0":211,"v1":212,"cMask":[],"color":"C7E6BD"},{"v0":212,"v1":213,"cMask":[],"color":"C7E6BD"},{"v0":214,"v1":215,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":217,"v1":216,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"C7E6BD"},{"v0":218,"v1":219,"cMask":[],"color":"C7E6BD"},{"v0":220,"v1":221,"cMask":[],"color":"C7E6BD"},{"v0":221,"v1":222,"cMask":[],"color":"C7E6BD"},{"v0":223,"v1":224,"cMask":[],"color":"C7E6BD"},{"v0":225,"v1":226,"cMask":[],"color":"C7E6BD"},{"v0":226,"v1":227,"cMask":[],"color":"C7E6BD"},{"v0":228,"v1":229,"cMask":[],"color":"C7E6BD"},{"v0":230,"v1":231,"cMask":[],"color":"C7E6BD"},{"v0":232,"v1":233,"cMask":[],"color":"C7E6BD"},{"v0":234,"v1":235,"cMask":[],"color":"C7E6BD"},{"v0":236,"v1":237,"cMask":[],"color":"C7E6BD"},{"v0":238,"v1":239,"cMask":[],"color":"C7E6BD"},{"v0":237,"v1":240,"cMask":[],"color":"C7E6BD"},{"v0":240,"v1":241,"cMask":[],"color":"C7E6BD"},{"v0":238,"v1":242,"cMask":[],"color":"C7E6BD"},{"v0":242,"v1":243,"cMask":[],"color":"C7E6BD"}],"planes":[{"normal":[0,1],"dist":-600,"bCoef":1.5,"cMask":["ball"]},{"normal":[0,-1],"dist":-600,"bCoef":1.5,"cMask":["ball"]},{"normal":[0,1],"dist":-750,"bCoef":0.1},{"normal":[0,-1],"dist":-750,"bCoef":0.1},{"normal":[1,0],"dist":-1350,"bCoef":0.1},{"normal":[-1,0],"dist":-1350,"bCoef":0.1}],"goals":[{"p0":[-1200,-110],"p1":[-1200,110],"team":"red"},{"p0":[1200,110],"p1":[1200,-110],"team":"blue"}],"discs":[{"damping":1,"color":"CCFF33","cGroup":["ball","kick","score"]},{"pos":[-1200,110],"radius":5,"bCoef":2,"invMass":0,"color":"FF66"},{"pos":[-1200,-110],"radius":5,"bCoef":2,"invMass":0,"color":"FF66"},{"pos":[1200,110],"radius":5,"bCoef":2,"invMass":0,"color":"FF66"},{"pos":[1200,-110],"radius":5,"bCoef":2,"invMass":0,"color":"FF66"},{"pos":[-1300,150],"radius":3,"bCoef":3,"invMass":0,"color":"FF66"},{"pos":[-1300,-150],"radius":3,"bCoef":3,"invMass":0,"color":"FF66"},{"pos":[1300,150],"radius":3,"bCoef":3,"invMass":0,"color":"FF66"},{"pos":[1300,-150],"radius":3,"bCoef":3,"invMass":0,"color":"FF66"},{"pos":[-1200,-600],"radius":3,"invMass":0,"color":"FFFF00","cGroup":[]},{"pos":[-1200,600],"radius":3,"invMass":0,"color":"FFFF00","cGroup":[]},{"pos":[1200,-600],"radius":3,"invMass":0,"color":"FFFF00","cGroup":[]},{"pos":[1200,600],"radius":3,"invMass":0,"color":"FFFF00","cGroup":[]},{"pos":[-115,720],"radius":15,"invMass":0,"color":"333333","cMask":["red","blue"]},{"pos":[-155,720],"radius":15,"invMass":0,"color":"333333","cMask":["red","blue"]},{"pos":[-195,720],"radius":15,"invMass":0,"color":"666666","cMask":["red","blue"]},{"pos":[115,720],"radius":15,"invMass":0,"color":"333333","cMask":["red","blue"]},{"pos":[155,720],"radius":15,"invMass":0,"color":"333333","cMask":["red","blue"]},{"pos":[195,720],"radius":15,"invMass":0,"color":"666666","cMask":["red","blue"]},{"pos":[-235,720],"radius":15,"invMass":0,"color":"E56E56","cMask":["red","blue"]},{"pos":[-275,720],"radius":15,"invMass":0,"color":"E56E56","cMask":["red","blue"]},{"pos":[-315,720],"radius":15,"invMass":0,"color":"E56E56","cMask":["red","blue"]},{"pos":[-355,720],"radius":15,"invMass":0,"color":"E56E56","cMask":["red","blue"]},{"pos":[-395,720],"radius":15,"invMass":0,"color":"E56E56","cMask":["red","blue"]},{"pos":[-435,720],"radius":15,"invMass":0,"color":"E56E56","cMask":["red","blue"]},{"pos":[-475,720],"radius":15,"invMass":0,"color":"E56E56","cMask":["red","blue"]},{"pos":[235,720],"radius":15,"invMass":0,"color":"5689E5","cMask":["red","blue"]},{"pos":[275,720],"radius":15,"invMass":0,"color":"5689E5","cMask":["red","blue"]},{"pos":[315,720],"radius":15,"invMass":0,"color":"5689E5","cMask":["red","blue"]},{"pos":[355,720],"radius":15,"invMass":0,"color":"5689E5","cMask":["red","blue"]},{"pos":[395,720],"radius":15,"invMass":0,"color":"5689E5","cMask":["red","blue"]},{"pos":[435,720],"radius":15,"invMass":0,"color":"5689E5","cMask":["red","blue"]},{"pos":[475,720],"radius":15,"invMass":0,"color":"5689E5","cMask":["red","blue"]}],"playerPhysics":{"damping":0.9995,"acceleration":0.025,"kickingAcceleration":0.0175,"kickingDamping":0.9995},"ballPhysics":"disc0","spawnDistance":350}',

	'BOUNDLESS': '{"name":"Boundless Original","width":420,"height":200,"bg":{"type":"grass","width":430,"height":210,"kickOffRadius":75},"vertexes":[{"x":-450,"y":230,"bCoef":10000,"cGroup":["all"]},{"x":-450,"y":-230,"bCoef":10000,"cGroup":["all"]},{"x":450,"y":230,"bCoef":10000,"cGroup":["all"]},{"x":450,"y":-230,"bCoef":10000,"cGroup":["all"]},{"x":-450,"y":-230,"bCoef":10000},{"x":450,"y":-230,"bCoef":10000},{"x":-450,"y":230,"bCoef":10000},{"x":450,"y":230,"bCoef":10000},{"x":-419,"y":70,"bCoef":0.5,"cMask":["wall"]},{"x":-419,"y":-70,"bCoef":0.5,"cMask":["wall"]},{"x":419,"y":-70,"bCoef":0.5,"cMask":["wall"]},{"x":-419,"y":-70,"bCoef":0.1,"cMask":["red","blue","ball"]},{"x":-419,"y":70,"bCoef":0.1,"cMask":["red","blue","ball"]},{"x":0,"y":-75,"bCoef":0,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-235,"bCoef":0,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":75,"bCoef":0,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":235,"bCoef":0,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":75,"bCoef":0,"cMask":["red","blue"],"cGroup":["blueKO"]},{"x":0,"y":-75,"bCoef":0,"cMask":["red","blue"],"cGroup":["blueKO"]},{"x":0,"y":-75,"bCoef":0,"cMask":["red","blue"],"cGroup":["redKO"]},{"x":0,"y":75,"bCoef":0,"cMask":["red","blue"],"cGroup":["redKO"]},{"x":419,"y":-80,"bCoef":0,"cMask":["red","blue","ball"]},{"x":455,"y":-80,"bCoef":0,"cMask":["red","blue","ball"]},{"x":419,"y":80,"bCoef":0,"cMask":["red","blue","ball"]},{"x":455,"y":80,"bCoef":0,"cMask":["red","blue","ball"]},{"x":-455,"y":-80,"bCoef":0,"cMask":["red","blue","ball"]},{"x":-419,"y":-80,"bCoef":0,"cMask":["red","blue","ball"]},{"x":-455,"y":80,"bCoef":0,"cMask":["red","blue","ball"]},{"x":-419,"y":80,"bCoef":0,"cMask":["red","blue","ball"]},{"x":419,"y":70,"bCoef":0,"cMask":["wall"]},{"x":419,"y":-70,"bCoef":0,"cMask":["wall"]},{"x":445,"y":-80,"bCoef":0,"cMask":["ball"]},{"x":445,"y":80,"bCoef":0,"cMask":["ball"]},{"x":-445,"y":-80,"bCoef":0,"cMask":["ball"]},{"x":-445,"y":80,"bCoef":0,"cMask":["ball"]}],"segments":[{"v0":0,"v1":1,"bCoef":10000,"vis":false,"cGroup":["all"]},{"v0":2,"v1":3,"bCoef":10000,"vis":false,"cGroup":["all"]},{"v0":4,"v1":5,"bCoef":10000,"vis":false},{"v0":6,"v1":7,"bCoef":10000,"vis":false},{"v0":8,"v1":9,"bCoef":0.5,"cMask":["wall"],"color":"FF0000"},{"v0":13,"v1":14,"bCoef":0,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":15,"v1":16,"bCoef":0,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":17,"v1":18,"bCoef":0,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["blueKO"]},{"v0":19,"v1":20,"bCoef":0,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["redKO"]},{"v0":21,"v1":22,"bCoef":0,"vis":false,"cMask":["red","blue","ball"]},{"v0":23,"v1":24,"bCoef":0,"vis":false,"cMask":["red","blue","ball"]},{"v0":25,"v1":26,"bCoef":0,"vis":false,"cMask":["red","blue","ball"]},{"v0":27,"v1":28,"bCoef":0,"vis":false,"cMask":["red","blue","ball"]},{"v0":29,"v1":30,"bCoef":0,"cMask":["wall"],"color":"FF"},{"v0":31,"v1":32,"bCoef":0,"cMask":["ball"]},{"v0":33,"v1":34,"bCoef":0,"cMask":["ball"]}],"planes":[{"normal":[-1,0],"dist":-455,"bCoef":0.0004},{"normal":[1,0],"dist":-455,"bCoef":0.0004},{"normal":[0,1],"dist":-235,"bCoef":0.0004},{"normal":[0,-1],"dist":-235,"bCoef":0.0004},{"normal":[-1,0],"dist":-420,"bCoef":0,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"normal":[1,0],"dist":-420,"bCoef":0,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]}],"goals":[{"p0":[-419,70],"p1":[-419,-70],"team":"red"},{"p0":[419,70],"p1":[419,-70],"team":"blue"}],"discs":[{"pos":[-419,-70],"invMass":0,"damping":1,"color":"FF8888","cMask":["red","blue","ball"],"cGroup":["wall"]},{"pos":[-419,70],"invMass":0,"damping":1,"color":"FF8888","cMask":["red","blue","ball"],"cGroup":["wall"]},{"pos":[419,70],"invMass":0,"damping":1,"color":"8888FF","cMask":["red","blue","ball"],"cGroup":["wall"]},{"pos":[419,-70],"invMass":0,"damping":1,"color":"8888FF","cMask":["red","blue","ball"],"cGroup":["wall"]}],"playerPhysics":{},"ballPhysics":{"cMask":["red","blue","wall"]},"spawnDistance":170}',
	'BOUNDLESS ULTRA': '{"name":"Boundless UltraBall by Galactic Boy","width":500,"height":250,"bg":{"type":"hockey","width":510,"height":260,"kickOffRadius":75},"vertexes":[{"x":-500,"y":-75,"cMask":["wall"]},{"x":-500,"y":75,"cMask":["wall"]},{"x":500,"y":-75,"cMask":["wall"]},{"x":500,"y":75,"cMask":["wall"]},{"x":0,"y":-280,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-75,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO"]},{"x":0,"y":75,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO"]},{"x":0,"y":280,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":-3,"y":-280,"cMask":["wall"]},{"x":-3,"y":-78,"cMask":["wall"]},{"x":3,"y":-280,"cMask":["wall"]},{"x":3,"y":-78,"cMask":["wall"]},{"x":-3,"y":78,"cMask":["wall"]},{"x":-3,"y":280,"cMask":["wall"]},{"x":3,"y":78,"cMask":["wall"]},{"x":3,"y":280,"cMask":["wall"]},{"x":0,"y":72,"cMask":["wall"]},{"x":0,"y":-72,"cMask":["wall"]},{"x":-3,"y":-72,"cMask":["wall"]},{"x":-3,"y":72,"cMask":["wall"]},{"x":3,"y":-72,"cMask":["wall"]},{"x":3,"y":72,"cMask":["wall"]},{"x":-500,"y":75,"bCoef":0,"cMask":["ball"]},{"x":-530,"y":45,"bCoef":0,"cMask":["ball"]},{"x":-530,"y":-45,"bCoef":0,"cMask":["ball"]},{"x":-500,"y":-75,"bCoef":0,"cMask":["ball"]},{"x":500,"y":-75,"bCoef":0,"cMask":["ball"]},{"x":530,"y":-45,"bCoef":0,"cMask":["ball"]},{"x":530,"y":45,"bCoef":0,"cMask":["ball"]},{"x":500,"y":75,"bCoef":0,"cMask":["ball"]},{"x":-15,"y":-30,"cMask":[]},{"x":-45,"y":-30,"cMask":[]},{"x":-45,"y":30,"cMask":[]},{"x":-15,"y":30,"cMask":[]},{"x":-15,"y":0,"cMask":[]},{"x":-30,"y":0,"cMask":[]},{"x":15,"y":-30,"cMask":[]},{"x":15,"y":30,"cMask":[]},{"x":30,"y":-30,"cMask":[]},{"x":30,"y":0,"cMask":[]},{"x":30,"y":30,"cMask":[]},{"x":15,"y":0,"cMask":[]},{"x":-531,"y":-280,"bCoef":10000},{"x":531,"y":-280,"bCoef":10000},{"x":531,"y":280,"bCoef":10000},{"x":-531,"y":280,"bCoef":10000}],"segments":[{"v0":0,"v1":1,"cMask":["wall"],"color":"808080"},{"v0":2,"v1":3,"cMask":["wall"],"color":"808080"},{"v0":4,"v1":5,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"FFFFFF"},{"v0":6,"v1":7,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"FFFFFF"},{"v0":6,"v1":5,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue"],"cGroup":["blueKO"],"color":"FFFFFF"},{"v0":5,"v1":6,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue"],"cGroup":["redKO"],"color":"FFFFFF"},{"v0":8,"v1":9,"cMask":["wall"],"color":"2020FF"},{"v0":10,"v1":11,"cMask":["wall"],"color":"2020FF"},{"v0":12,"v1":13,"cMask":["wall"],"color":"2020FF"},{"v0":14,"v1":15,"cMask":["wall"],"color":"2020FF"},{"v0":12,"v1":9,"curve":174,"curveF":0.05240777928304134,"cMask":["wall"],"color":"2020FF"},{"v0":11,"v1":14,"curve":174,"curveF":0.05240777928304134,"cMask":["wall"],"color":"2020FF"},{"v0":16,"v1":17,"curve":180,"curveF":6.123233995736766e-17,"cMask":["wall"],"color":"2020FF"},{"v0":17,"v1":16,"curve":180,"curveF":6.123233995736766e-17,"cMask":["wall"],"color":"2020FF"},{"v0":17,"v1":16,"cMask":["wall"],"color":"FFFFFF"},{"v0":18,"v1":19,"cMask":["wall"],"color":"2020FF"},{"v0":20,"v1":21,"cMask":["wall"],"color":"2020FF"},{"v0":22,"v1":23,"bCoef":0,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"],"color":"101088"},{"v0":23,"v1":24,"bCoef":0,"cMask":["ball"],"color":"101088"},{"v0":24,"v1":25,"bCoef":0,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"],"color":"101088"},{"v0":26,"v1":27,"bCoef":0,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"],"color":"101088"},{"v0":27,"v1":28,"bCoef":0,"cMask":["ball"],"color":"101088"},{"v0":28,"v1":29,"bCoef":0,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"],"color":"101088"},{"v0":30,"v1":31,"cMask":[],"color":"800080"},{"v0":31,"v1":32,"cMask":[],"color":"800080"},{"v0":32,"v1":33,"cMask":[],"color":"800080"},{"v0":33,"v1":34,"cMask":[],"color":"800080"},{"v0":34,"v1":35,"cMask":[],"color":"800080"},{"v0":36,"v1":37,"cMask":[],"color":"800080"},{"v0":36,"v1":38,"cMask":[],"color":"800080"},{"v0":38,"v1":39,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"800080"},{"v0":39,"v1":40,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"800080"},{"v0":40,"v1":37,"cMask":[],"color":"800080"},{"v0":41,"v1":39,"cMask":[],"color":"800080"},{"v0":42,"v1":43,"bCoef":10000,"vis":false},{"v0":43,"v1":44,"bCoef":10000,"vis":false},{"v0":44,"v1":45,"bCoef":10000,"vis":false},{"v0":45,"v1":42,"bCoef":10000,"vis":false}],"planes":[{"normal":[1,0],"dist":-536,"bCoef":0.0004},{"normal":[-1,0],"dist":-536,"bCoef":0.0004},{"normal":[0,1],"dist":-288,"bCoef":0.0004},{"normal":[0,-1],"dist":-288,"bCoef":0.0004},{"normal":[1,0],"dist":-500,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"normal":[-1,0],"dist":-500,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"normal":[1,0],"dist":-100000,"bCoef":0,"cGroup":["ball"]},{"normal":[-1,0],"dist":-100000,"bCoef":0,"cGroup":["ball"]},{"normal":[0,-1],"dist":-199000,"bCoef":0,"cGroup":["ball"]},{"normal":[0,1],"dist":-199000,"bCoef":0,"cGroup":["ball"]}],"goals":[{"p0":[-500,-75],"p1":[-500,75],"team":"red"},{"p0":[500,-75],"p1":[500,75],"team":"blue"}],"discs":[{"damping":0.9975,"color":"4040FF","cGroup":["ball","kick","score"]},{"pos":[-500,-75],"radius":8,"invMass":0},{"pos":[-500,75],"radius":8,"invMass":0},{"pos":[500,-75],"radius":8,"invMass":0},{"pos":[500,75],"radius":8,"invMass":0},{"pos":[0,-100000],"radius":100000,"bCoef":0,"invMass":100,"color":"transparent","cMask":["ball"]},{"pos":[0,100000],"radius":100000,"bCoef":0,"invMass":100,"color":"transparent","cMask":["ball"]}],"playerPhysics":{"invMass":1e+100,"kickStrength":10},"ballPhysics":"disc0","spawnDistance":250}',
	'REVERSEBALL': '{"name":"Reverse Ball Classic","width":420,"height":200,"bg":{"type":"grass","width":370,"height":170,"kickOffRadius":75},"vertexes":[{"x":-370,"y":170,"cMask":["ball"]},{"x":-370,"y":64,"cMask":["ball"]},{"x":-370,"y":-64,"cMask":["ball"]},{"x":-370,"y":-170,"cMask":["ball"]},{"x":370,"y":170,"cMask":["ball"]},{"x":370,"y":64,"cMask":["ball"]},{"x":370,"y":-64,"cMask":["ball"]},{"x":370,"y":-170,"cMask":["ball"]},{"x":0,"y":200,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":75,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-75,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-200,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":-380,"y":-64,"bCoef":0.1,"cMask":["ball"]},{"x":-400,"y":-44,"bCoef":0.1,"cMask":["ball"]},{"x":-400,"y":44,"bCoef":0.1,"cMask":["ball"]},{"x":-380,"y":64,"bCoef":0.1,"cMask":["ball"]},{"x":380,"y":-64,"bCoef":0.1,"cMask":["ball"]},{"x":400,"y":-44,"bCoef":0.1,"cMask":["ball"]},{"x":400,"y":44,"bCoef":0.1,"cMask":["ball"]},{"x":380,"y":64,"bCoef":0.1,"cMask":["ball"]}],"segments":[{"v0":0,"v1":1,"vis":false,"cMask":["ball"]},{"v0":2,"v1":3,"vis":false,"cMask":["ball"]},{"v0":4,"v1":5,"vis":false,"cMask":["ball"]},{"v0":6,"v1":7,"vis":false,"cMask":["ball"]},{"v0":13,"v1":12,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":13,"v1":14,"bCoef":0.1,"cMask":["ball"]},{"v0":15,"v1":14,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":16,"v1":17,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":17,"v1":18,"bCoef":0.1,"cMask":["ball"]},{"v0":18,"v1":19,"bCoef":0.1,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":["ball"]},{"v0":8,"v1":9,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":9,"v1":10,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["blueKO"]},{"v0":10,"v1":9,"bCoef":0.1,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["redKO"]},{"v0":10,"v1":11,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]}],"planes":[{"normal":[0,1],"dist":-170,"cMask":["ball"]},{"normal":[0,-1],"dist":-170,"cMask":["ball"]},{"normal":[0,1],"dist":-200,"bCoef":0.1},{"normal":[0,-1],"dist":-200,"bCoef":0.1},{"normal":[1,0],"dist":-420,"bCoef":0.1},{"normal":[-1,0],"dist":-420,"bCoef":0.1}],"goals":[{"p0":[-370,64],"p1":[-370,-64],"team":"red"},{"p0":[370,64],"p1":[370,-64],"team":"blue"}],"discs":[{"pos":[-370,64],"radius":8,"invMass":0,"color":"FFCCCC"},{"pos":[-370,-64],"radius":8,"invMass":0,"color":"FFCCCC"},{"pos":[370,64],"radius":8,"invMass":0,"color":"CCCCFF"},{"pos":[370,-64],"radius":8,"invMass":0,"color":"CCCCFF"}],"playerPhysics":{"bCoef":-0.5,"acceleration":0.13,"kickingAcceleration":1,"kickingDamping":0.5,"kickStrength":-5},"ballPhysics":{"bCoef":0.6,"invMass":0.9},"spawnDistance":170}',
	'HAXMAZE': '{"name":"Haxmaze 1.0","width":1000,"height":1000,"bg":{"type":"hockey","kickOffRadius":10},"vertexes":[{"x":0,"y":-10,"cMask":[]},{"x":0,"y":10,"cMask":[]},{"x":-12,"y":-10,"cMask":[]},{"x":-12,"y":10,"cMask":[]},{"x":-25,"y":-10,"cMask":[]},{"x":-12,"y":0,"cMask":[]},{"x":-25,"y":10,"cMask":[]},{"x":12,"y":-10,"cMask":[]},{"x":12,"y":10,"cMask":[]},{"x":25,"y":-10,"cMask":[]},{"x":12,"y":0,"cMask":[]},{"x":25,"y":10,"cMask":[]},{"x":0,"y":-35,"cMask":[]},{"x":0,"y":35,"cMask":[]},{"x":0,"y":-40,"cMask":[]},{"x":0,"y":40,"cMask":[]},{"x":0,"y":-45,"cMask":[]},{"x":0,"y":45,"cMask":[]},{"x":-50,"y":-125},{"x":50,"y":-125},{"x":-50,"y":125},{"x":50,"y":125},{"x":-200,"y":0,"cMask":["red","ball"]},{"x":200,"y":0,"cMask":["blue","ball"]},{"x":-15,"y":-200},{"x":-15,"y":200},{"x":15,"y":-200},{"x":15,"y":200},{"x":-240,"y":-15},{"x":240,"y":-15},{"x":-240,"y":15},{"x":240,"y":15},{"x":-15,"y":-280},{"x":-15,"y":280},{"x":15,"y":-280},{"x":15,"y":280},{"x":-200,"y":-250},{"x":250,"y":200},{"x":-226,"y":-226},{"x":226,"y":226},{"x":-356,"y":50},{"x":356,"y":-50},{"x":-352,"y":80},{"x":359,"y":-20},{"x":-100,"y":-388},{"x":100,"y":388},{"x":-65,"y":-396},{"x":135,"y":377},{"x":-440,"y":-15},{"x":440,"y":-15},{"x":-440,"y":15},{"x":440,"y":15},{"x":-400,"y":267},{"x":400,"y":-267},{"x":-378,"y":295},{"x":420,"y":-235},{"x":0,"y":-520},{"x":-30,"y":520},{"x":0,"y":520},{"x":30,"y":-520},{"x":-560,"y":-15},{"x":560,"y":-15},{"x":-560,"y":15},{"x":560,"y":15},{"x":-360,"y":480},{"x":360,"y":-480},{"x":-330,"y":501},{"x":390,"y":-456},{"x":-500,"y":-400},{"x":500,"y":400},{"x":-523,"y":-370},{"x":473,"y":432},{"x":-680,"y":-15},{"x":680,"y":-15},{"x":-680,"y":15},{"x":680,"y":15},{"x":-170,"y":701},{"x":170,"y":-701},{"x":-130,"y":709},{"x":210,"y":-692},{"x":-600,"y":-468},{"x":600,"y":468},{"x":-575,"y":-498},{"x":620,"y":440},{"x":-15,"y":-800},{"x":-15,"y":800},{"x":15,"y":-800},{"x":15,"y":800},{"x":-840,"y":-15},{"x":840,"y":-15},{"x":-840,"y":15},{"x":840,"y":15},{"x":0,"y":-955,"cMask":[]},{"x":0,"y":955,"cMask":[]},{"x":0,"y":-960,"cMask":[]},{"x":0,"y":960,"cMask":[]},{"x":0,"y":-965,"cMask":[]},{"x":0,"y":965,"cMask":[]},{"x":-850,"y":0,"cMask":[]},{"x":-900,"y":-15,"cMask":[]},{"x":-900,"y":15,"cMask":[]},{"x":850,"y":0,"cMask":[]},{"x":900,"y":-15,"cMask":[]},{"x":900,"y":15,"cMask":[]},{"x":-940,"y":-5,"cMask":[]},{"x":-940,"y":5,"cMask":[]},{"x":-933,"y":5,"cMask":[]},{"x":-934,"y":5,"cMask":[]},{"x":-923,"y":-5,"cMask":[]},{"x":-923,"y":5,"cMask":[]}],"segments":[{"v0":1,"v1":0,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"FFFFFF"},{"v0":0,"v1":1,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"FFFFFF"},{"v0":2,"v1":3,"cMask":[],"color":"FFFFFF"},{"v0":4,"v1":5,"cMask":[],"color":"FFFFFF"},{"v0":5,"v1":6,"cMask":[],"color":"FFFFFF"},{"v0":7,"v1":8,"cMask":[],"color":"FFFFFF"},{"v0":9,"v1":10,"cMask":[],"color":"FFFFFF"},{"v0":10,"v1":11,"cMask":[],"color":"FFFFFF"},{"v0":13,"v1":12,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"FF0000"},{"v0":12,"v1":13,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"FF0000"},{"v0":15,"v1":14,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"FFFFFF"},{"v0":14,"v1":15,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"FFFFFF"},{"v0":17,"v1":16,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"66CC"},{"v0":16,"v1":17,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"66CC"},{"v0":19,"v1":18,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"FF0000"},{"v0":18,"v1":19,"cMask":[],"color":"FF0000"},{"v0":18,"v1":19,"bCoef":0.05,"curve":180,"curveF":6.123233995736766e-17,"cMask":["ball"]},{"v0":20,"v1":21,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"66CC"},{"v0":20,"v1":21,"cMask":[],"color":"66CC"},{"v0":21,"v1":20,"bCoef":0.05,"curve":180,"curveF":6.123233995736766e-17,"cMask":["ball"]},{"v0":23,"v1":22,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","ball"],"color":"66CC"},{"v0":22,"v1":23,"curve":180,"curveF":6.123233995736766e-17,"cMask":["blue","ball"],"color":"FF0000"},{"v0":25,"v1":24,"curve":171,"curveF":0.07870170682461851,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":26,"v1":27,"curve":171,"curveF":0.07870170682461851,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":28,"v1":29,"curve":173,"curveF":0.06116262015048434,"cMask":["red","blue","ball"],"color":"FF0000"},{"v0":31,"v1":30,"curve":173,"curveF":0.06116262015048434,"cMask":["red","blue","ball"],"color":"FF0000"},{"v0":33,"v1":32,"curve":174,"curveF":0.05240777928304134,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":34,"v1":35,"curve":174,"curveF":0.05240777928304134,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":36,"v1":37,"curve":167,"curveF":0.11393560830164559,"cMask":["red","blue","ball"],"color":"66CC"},{"v0":39,"v1":38,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue","ball"],"color":"66CC"},{"v0":40,"v1":41,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":43,"v1":42,"curve":170,"curveF":0.08748866352592397,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":45,"v1":44,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue","ball"],"color":"FF0000"},{"v0":46,"v1":47,"curve":169,"curveF":0.0962890481975387,"cMask":["red","blue","ball"],"color":"FF0000"},{"v0":48,"v1":49,"curve":176,"curveF":0.03492076949174784,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":51,"v1":50,"curve":176,"curveF":0.03492076949174784,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":52,"v1":53,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue","ball"],"color":"66CC"},{"v0":55,"v1":54,"curve":171,"curveF":0.07870170682461851,"cMask":["red","blue","ball"],"color":"66CC"},{"v0":57,"v1":56,"curve":176.5,"curveF":0.030552763298588796,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":59,"v1":58,"curve":177,"curveF":0.026185921569186914,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":60,"v1":61,"curve":177,"curveF":0.026185921569186914,"cMask":["red","blue","ball"],"color":"FF0000"},{"v0":63,"v1":62,"curve":177,"curveF":0.026185921569186914,"cMask":["red","blue","ball"],"color":"FF0000"},{"v0":64,"v1":65,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":67,"v1":66,"curve":173,"curveF":0.06116262015048434,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":68,"v1":69,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue","ball"],"color":"66CC"},{"v0":71,"v1":70,"curve":173,"curveF":0.06116262015048434,"cMask":["red","blue","ball"],"color":"66CC"},{"v0":72,"v1":73,"curve":177.5,"curveF":0.02182007762214951,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":75,"v1":74,"curve":177.5,"curveF":0.02182007762214951,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":76,"v1":77,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue","ball"],"color":"FF0000"},{"v0":79,"v1":78,"curve":173.5,"curveF":0.05678411512761222,"cMask":["red","blue","ball"],"color":"FF0000"},{"v0":81,"v1":80,"curve":180,"curveF":6.123233995736766e-17,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":82,"v1":83,"curve":175,"curveF":0.04366094290851207,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":85,"v1":84,"curve":178,"curveF":0.017455064928217672,"cMask":["red","blue","ball"],"color":"66CC"},{"v0":86,"v1":87,"curve":178,"curveF":0.017455064928217672,"cMask":["red","blue","ball"],"color":"66CC"},{"v0":88,"v1":89,"curve":178,"curveF":0.017455064928217672,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":91,"v1":90,"curve":178,"curveF":0.017455064928217672,"cMask":["red","blue","ball"],"color":"FFFFFF"},{"v0":93,"v1":92,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"FF0000"},{"v0":92,"v1":93,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"FF0000"},{"v0":95,"v1":94,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"FFFFFF"},{"v0":94,"v1":95,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"FFFFFF"},{"v0":97,"v1":96,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"66CC"},{"v0":96,"v1":97,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"66CC"},{"v0":98,"v1":99,"cMask":[],"color":"FFFFFF"},{"v0":99,"v1":100,"cMask":[],"color":"FFFFFF"},{"v0":100,"v1":98,"cMask":[],"color":"FFFFFF"},{"v0":101,"v1":102,"cMask":[],"color":"FFFFFF"},{"v0":102,"v1":103,"cMask":[],"color":"FFFFFF"},{"v0":103,"v1":101,"cMask":[],"color":"FFFFFF"},{"v0":104,"v1":105,"cMask":[],"color":"FFFFFF"},{"v0":106,"v1":107,"cMask":[],"color":"FFFFFF"},{"v0":109,"v1":108,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"FFFFFF"},{"v0":108,"v1":109,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"FFFFFF"}],"planes":[{"normal":[0,1],"dist":-1000,"bCoef":0.1},{"normal":[0,-1],"dist":-1000,"bCoef":0.1},{"normal":[1,0],"dist":-1000,"bCoef":0.1},{"normal":[-1,0],"dist":-1000,"bCoef":0.1}],"goals":[{"p0":[-50,-125],"p1":[50,-125],"team":"red"},{"p0":[-50,125],"p1":[50,125],"team":"blue"}],"discs":[{"cGroup":["ball","kick","score"]},{"pos":[-50,-125],"radius":7,"bCoef":1,"invMass":0},{"pos":[50,-125],"radius":7,"bCoef":1,"invMass":0},{"pos":[-50,125],"radius":7,"bCoef":1,"invMass":0},{"pos":[50,125],"radius":7,"bCoef":1,"invMass":0}],"playerPhysics":{},"ballPhysics":"disc0","spawnDistance":928}',
	'HEADBALL': '{"name":"3D Kafa Topu 2 | Head Ball 2 by Vhagar","width":620,"height":180,"bg":{"color":"B1249"},"vertexes":[{"x":-37.181816101074,"y":-170.26705932617,"bCoef":1.6,"cMask":["wall"]},{"x":-25.181816101074,"y":-140.26705932617,"bCoef":1.6,"cMask":["wall"]},{"x":-15.181816101074,"y":-170.26705932617,"bCoef":1.6,"cMask":["wall"]},{"x":-4.1818161010742,"y":-170.26705932617,"bCoef":1.6,"cMask":["wall"]},{"x":-5.1818161010742,"y":-140.26705932617,"bCoef":1.6,"cMask":["wall"]},{"x":-4.1818161010742,"y":-151.26705932617,"bCoef":1.6,"cMask":["wall"]},{"x":2.8181838989258,"y":-158.26705932617,"bCoef":1.6,"cMask":["wall"]},{"x":8.8181838989258,"y":-150.26705932617,"bCoef":1.6,"cMask":["wall"]},{"x":8.8181838989258,"y":-140.26705932617,"bCoef":1.6,"cMask":["wall"]},{"x":14.818183898926,"y":-151.26705932617,"bCoef":1.6,"cMask":["wall"]},{"x":29.818183898926,"y":-150.26705932617,"bCoef":1.6,"cMask":["wall"]},{"x":31.818183898926,"y":-158.26705932617,"bCoef":1.6,"cMask":["wall"]},{"x":31.818183898926,"y":-140.26705932617,"bCoef":1.6,"cMask":["wall"]},{"x":-590.5,"y":-450.99609375,"bCoef":1.6,"cMask":["red","blue","ball"]},{"x":599.25,"y":-449.99609375,"bCoef":1.6,"cMask":["red","blue","ball"]},{"x":781.68469980866,"y":147.5,"bCoef":1.6,"cMask":["wall"]},{"x":-797.68469980866,"y":147.5,"bCoef":1.6,"cMask":["wall"]},{"x":781.68469980866,"y":144.5,"bCoef":1.6,"cMask":["wall"]},{"x":-797.68469980866,"y":144.5,"bCoef":1.6,"cMask":["wall"]},{"x":781.68469980866,"y":141.5,"bCoef":1.6,"cMask":["wall"]},{"x":-797.68469980866,"y":141.5,"bCoef":1.6,"cMask":["wall"]},{"x":783.85416326967,"y":153,"bCoef":1.6,"cMask":["red","blue"]},{"x":-799.85416326967,"y":153,"bCoef":1.6,"cMask":["red","blue"]},{"x":783.85416326967,"y":158,"bCoef":1.6,"cMask":["wall"]},{"x":-799.85416326967,"y":158,"bCoef":1.6,"cMask":["wall"]},{"x":783.85416326967,"y":155.5,"bCoef":1.6,"cMask":["wall"]},{"x":-799.85416326967,"y":155.5,"bCoef":1.6,"cMask":["wall"]},{"x":781.68469980866,"y":150.5,"bCoef":1.6,"cMask":["wall"]},{"x":-797.68469980866,"y":150.5,"bCoef":1.6,"cMask":["wall"]},{"x":779.51523634764,"y":153,"bCoef":1.6,"cMask":["wall"]},{"x":-795.51523634764,"y":153,"bCoef":1.6,"cMask":["wall"]},{"x":788.85416326967,"y":168,"bCoef":1.6,"cMask":["wall"]},{"x":789.85416326967,"y":158,"bCoef":1.6,"cMask":["red","blue"]},{"x":-793.85416326967,"y":158,"bCoef":1.6,"cMask":["red","blue"]},{"x":789.85416326967,"y":163,"bCoef":1.6,"cMask":["wall"]},{"x":-793.85416326967,"y":163,"bCoef":1.6,"cMask":["wall"]},{"x":789.85416326967,"y":160.5,"bCoef":1.6,"cMask":["wall"]},{"x":-793.85416326967,"y":160.5,"bCoef":1.6,"cMask":["wall"]},{"x":785.51523634764,"y":158,"bCoef":1.6,"cMask":["wall"]},{"x":786.85416326967,"y":189.54544067383,"bCoef":1.6,"cMask":["red","blue"]},{"x":-796.85416326967,"y":189.54544067383,"bCoef":1.6,"cMask":["red","blue"]},{"x":786.85416326967,"y":194.54544067383,"bCoef":1.6,"cMask":["wall"]},{"x":-796.85416326967,"y":194.54544067383,"bCoef":1.6,"cMask":["wall"]},{"x":786.85416326967,"y":192.04544067383,"bCoef":1.6,"cMask":["wall"]},{"x":-796.85416326967,"y":192.04544067383,"bCoef":1.6,"cMask":["wall"]},{"x":784.85416326967,"y":200,"bCoef":1.6,"cMask":["red","blue"]},{"x":-798.85416326967,"y":200,"bCoef":1.6,"cMask":["red","blue"]},{"x":784.85416326967,"y":205,"bCoef":1.6,"cMask":["wall"]},{"x":-798.85416326967,"y":205,"bCoef":1.6,"cMask":["wall"]},{"x":784.85416326967,"y":202.5,"bCoef":1.6,"cMask":["wall"]},{"x":-798.85416326967,"y":202.5,"bCoef":1.6,"cMask":["wall"]},{"x":782.68469980866,"y":197.5,"bCoef":1.6,"cMask":["wall"]},{"x":-796.68469980866,"y":197.5,"bCoef":1.6,"cMask":["wall"]},{"x":780.51523634764,"y":200,"bCoef":1.6,"cMask":["wall"]},{"x":-794.51523634764,"y":200,"bCoef":1.6,"cMask":["wall"]},{"x":788.85416326967,"y":166,"bCoef":1.6,"cMask":["wall"]},{"x":-794.85416326967,"y":166,"bCoef":1.6,"cMask":["wall"]},{"x":-554,"y":203.66668701172,"bCoef":1.6,"cMask":["wall"]},{"x":563,"y":202.66668701172,"bCoef":1.6,"cMask":["wall"]},{"x":-1,"y":153.66668701172,"bCoef":1.6,"cMask":["wall"]},{"x":-1,"y":203.66668701172,"bCoef":1.6,"cMask":["wall"]},{"x":-92,"y":175.66668701172,"bCoef":1.6,"cMask":["wall"]},{"x":88,"y":175.66668701172,"bCoef":1.6,"cMask":["wall"]},{"x":785.85416326967,"y":189,"bCoef":1.6,"cMask":["wall"]},{"x":786.85416326967,"y":179,"bCoef":1.6,"cMask":["red","blue"]},{"x":-796.85416326967,"y":179,"bCoef":1.6,"cMask":["red","blue"]},{"x":786.85416326967,"y":184,"bCoef":1.6,"cMask":["wall"]},{"x":-796.85416326967,"y":184,"bCoef":1.6,"cMask":["wall"]},{"x":786.85416326967,"y":181.5,"bCoef":1.6,"cMask":["wall"]},{"x":-796.85416326967,"y":181.5,"bCoef":1.6,"cMask":["wall"]},{"x":782.51523634764,"y":179,"bCoef":1.6,"cMask":["wall"]},{"x":785.85416326967,"y":187,"bCoef":1.6,"cMask":["wall"]},{"x":-797.85416326967,"y":187,"bCoef":1.6,"cMask":["wall"]},{"x":785.85416326967,"y":171,"bCoef":1.6,"cMask":["red","blue"]},{"x":-797.85416326967,"y":171,"bCoef":1.6,"cMask":["red","blue"]},{"x":785.85416326967,"y":176,"bCoef":1.6,"cMask":["wall"]},{"x":-797.85416326967,"y":176,"bCoef":1.6,"cMask":["wall"]},{"x":785.85416326967,"y":173.5,"bCoef":1.6,"cMask":["wall"]},{"x":-797.85416326967,"y":173.5,"bCoef":1.6,"cMask":["wall"]},{"x":783.68469980866,"y":168.5,"bCoef":1.6,"cMask":["wall"]},{"x":-795.68469980866,"y":168.5,"bCoef":1.6,"cMask":["wall"]},{"x":781.51523634764,"y":171,"bCoef":1.6,"cMask":["wall"]},{"x":-793.51523634764,"y":171,"bCoef":1.6,"cMask":["wall"]},{"x":-506,"y":155.66668701172,"bCoef":1.6,"cMask":["wall"]},{"x":515,"y":153.66668701172,"bCoef":1.6,"cMask":["wall"]},{"x":-92,"y":175.66668701172,"bCoef":1.6,"cMask":["wall"]},{"x":88,"y":175.66668701172,"bCoef":1.6,"cMask":["wall"]},{"x":-92,"y":175.66668701172,"bCoef":1.6,"cMask":["wall"]},{"x":88,"y":175.66668701172,"bCoef":1.6,"cMask":["wall"]},{"x":-1,"y":153.66668701172,"bCoef":1.6,"cMask":["wall"]},{"x":-1,"y":203.66668701172,"bCoef":1.6,"cMask":["wall"]},{"x":-504.15346375744,"y":163.85135603883,"bCoef":1.6,"cMask":["wall"]},{"x":-550.18181610107,"y":194.46020507812,"bCoef":1.6,"cMask":["wall"]},{"x":-615.18181610107,"y":121.46020507812,"bCoef":1.6,"cMask":["wall"]},{"x":-582.18181610107,"y":196.46020507812,"bCoef":1.6,"cMask":["wall"]},{"x":-620.18181610107,"y":155.46020507812,"bCoef":1.6,"cMask":["wall"]},{"x":-552.18181610107,"y":131.46020507812,"bCoef":1.6,"cMask":["wall"]},{"x":-610.18181610107,"y":86.460205078125,"bCoef":1.6,"cMask":["wall"]},{"x":-550.18181610107,"y":97.460205078125,"bCoef":1.6,"cMask":["wall"]},{"x":-604.18181610107,"y":55.460205078125,"bCoef":1.6,"cMask":["wall"]},{"x":-551.18181610107,"y":62.551132202148,"bCoef":1.6,"cMask":["wall"]},{"x":-599.18181610107,"y":22.551132202148,"bCoef":1.6,"cMask":["wall"]},{"x":-551.18181610107,"y":30.551132202148,"bCoef":1.6,"cMask":["wall"]},{"x":-595.18181610107,"y":-7.4488677978516,"bCoef":1.6,"cMask":["wall"]},{"x":-551.18181610107,"y":0.55113220214844,"bCoef":1.6,"cMask":["wall"]},{"x":-590.18181610107,"y":-35.448867797852,"bCoef":1.6,"cMask":["wall"]},{"x":-552.18181610107,"y":-24.448867797852,"bCoef":1.6,"cMask":["wall"]},{"x":-567.18181610107,"y":-39.448867797852,"bCoef":1.6,"cMask":["wall"]},{"x":-628.18181610107,"y":195.00567626953,"bCoef":1.6,"cMask":["wall"]},{"x":-549.18181610107,"y":165.00567626953,"bCoef":1.6,"cMask":["wall"]},{"x":-574.60000228882,"y":-52,"bCoef":1.6,"cMask":["wall"]},{"x":-535.60000228882,"y":-55,"bCoef":0,"cMask":["wall"]},{"x":-523.60000228882,"y":-71,"bCoef":1.6,"cMask":["wall"]},{"x":-555.60000228882,"y":-71,"bCoef":1.6,"cMask":["wall"]},{"x":-515,"y":162.25390625,"bCoef":1.6,"cMask":["wall"]},{"x":-522,"y":-68.74609375,"bCoef":1.6,"cMask":["wall"]},{"x":-548,"y":195.25390625,"bCoef":1.6,"cMask":["wall"]},{"x":-551,"y":-39.74609375,"bCoef":1.6,"cMask":["wall"]},{"x":-591,"y":-38.74609375,"bCoef":1.6,"cMask":["wall"]},{"x":-558,"y":-67.74609375,"bCoef":1.6,"cMask":["wall"]},{"x":-628,"y":196.25390625,"bCoef":1.6,"cMask":["wall"]},{"x":-512.5,"y":161.50390625,"bCoef":1.6,"cMask":["wall"]},{"x":-519.5,"y":-70.49609375,"bCoef":1.6,"cMask":["red","blue","ball"]},{"x":-559.5,"y":-69.49609375,"bCoef":1.6,"cMask":["red","blue","ball"]},{"x":-593.5,"y":-38.49609375,"bCoef":1.6,"cMask":["red","blue","ball"]},{"x":-631.5,"y":194.50390625,"bCoef":0,"cMask":["red","blue","ball"]},{"x":-624.5,"y":194.50390625,"bCoef":1.6,"cMask":["wall"]},{"x":-587.5,"y":-35.49609375,"bCoef":1.6,"cMask":["wall"]},{"x":-554.5,"y":-35.49609375,"bCoef":1.6,"cMask":["wall"]},{"x":-551.5,"y":195.50390625,"bCoef":1.6,"cMask":["wall"]},{"x":-545.5,"y":194.50390625,"bCoef":1.6,"cMask":["wall"]},{"x":-548.5,"y":-36.49609375,"bCoef":1.6,"cMask":["wall"]},{"x":-524.5,"y":-62.49609375,"bCoef":1.6,"cMask":["wall"]},{"x":-517.5,"y":160.50390625,"bCoef":1.6,"cMask":["wall"]},{"x":-553.5,"y":-41.49609375,"bCoef":1.6,"cMask":["red","blue","wall"]},{"x":-527.5,"y":-65.49609375,"bCoef":1.6,"cMask":["red","blue","wall"]},{"x":-556.5,"y":-64.49609375,"bCoef":1.6,"cMask":["wall"]},{"x":-583.5,"y":-40.49609375,"bCoef":1.6,"cMask":["wall"]},{"x":-558.18181610107,"y":-62.085235595703,"bCoef":1.6,"cMask":["wall"]},{"x":-522.18181610107,"y":-44.085235595703,"bCoef":1.6,"cMask":["wall"]},{"x":-547.18181610107,"y":-30.085235595703,"bCoef":1.6,"cMask":["wall"]},{"x":-521.18181610107,"y":-15.085235595703,"bCoef":1.6,"cMask":["wall"]},{"x":-547.18181610107,"y":2.9147644042969,"bCoef":1.6,"cMask":["wall"]},{"x":-520.18181610107,"y":16.914764404297,"bCoef":1.6,"cMask":["wall"]},{"x":-547.18181610107,"y":35.914764404297,"bCoef":1.6,"cMask":["wall"]},{"x":-520.18181610107,"y":50.914764404297,"bCoef":1.6,"cMask":["wall"]},{"x":-545.18181610107,"y":69.914764404297,"bCoef":1.6,"cMask":["wall"]},{"x":-519.18181610107,"y":84.914764404297,"bCoef":1.6,"cMask":["wall"]},{"x":-544.18181610107,"y":103.9147644043,"bCoef":1.6,"cMask":["wall"]},{"x":-518.18181610107,"y":121.9147644043,"bCoef":1.6,"cMask":["wall"]},{"x":-545.18181610107,"y":140.9147644043,"bCoef":1.6,"cMask":["wall"]},{"x":-517.18181610107,"y":157.9147644043,"bCoef":1.6,"cMask":["wall"]},{"x":-522,"y":-68.74609375,"bCoef":1.6,"cMask":["wall"]},{"x":-551,"y":-39.74609375,"bCoef":1.6,"cMask":["wall"]},{"x":-553.5,"y":-41.49609375,"bCoef":1.6,"cMask":["red","blue","wall"]},{"x":-527.5,"y":-65.49609375,"bCoef":1.6,"cMask":["red","blue","wall"]},{"x":-548.5,"y":-36.49609375,"bCoef":0,"cMask":["red","blue","ball"]},{"x":-524.5,"y":-62.49609375,"bCoef":0,"cMask":["red","blue","ball"]},{"x":-524.5,"y":-62.49609375,"bCoef":1.6,"cMask":["wall"]},{"x":-517.5,"y":160.50390625,"bCoef":1.6,"cMask":["wall"]},{"x":-545.5,"y":194.50390625,"bCoef":1.6,"cMask":["wall"]},{"x":-548.5,"y":-36.49609375,"bCoef":1.6,"cMask":["wall"]},{"x":557.18181610107,"y":192.91486728784,"bCoef":1.6,"cMask":["wall"]},{"x":622.18181610107,"y":125.17538804786,"bCoef":1.6,"cMask":["wall"]},{"x":589.18181610107,"y":194.7707434314,"bCoef":1.6,"cMask":["wall"]},{"x":627.18181610107,"y":156.7252824884,"bCoef":1.6,"cMask":["wall"]},{"x":559.18181610107,"y":134.45476876567,"bCoef":1.6,"cMask":["wall"]},{"x":617.18181610107,"y":92.697555535549,"bCoef":1.6,"cMask":["wall"]},{"x":557.18181610107,"y":102.90487432513,"bCoef":1.6,"cMask":["wall"]},{"x":611.18181610107,"y":63.931475310356,"bCoef":1.6,"cMask":["wall"]},{"x":558.18181610107,"y":70.511416552958,"bCoef":1.6,"cMask":["wall"]},{"x":606.18181610107,"y":33.39389368174,"bCoef":1.6,"cMask":["wall"]},{"x":558.18181610107,"y":40.817398255984,"bCoef":1.6,"cMask":["wall"]},{"x":602.18181610107,"y":5.5557515283272,"bCoef":1.6,"cMask":["wall"]},{"x":558.18181610107,"y":12.979256102571,"bCoef":1.6,"cMask":["wall"]},{"x":597.18181610107,"y":-20.426514481525,"bCoef":1.6,"cMask":["wall"]},{"x":559.18181610107,"y":-10.21919569194,"bCoef":1.6,"cMask":["wall"]},{"x":574.18181610107,"y":-24.138266768647,"bCoef":1.6,"cMask":["wall"]},{"x":635.18181610107,"y":193.4210307734,"bCoef":1.6,"cMask":["wall"]},{"x":556.18181610107,"y":165.58288861999,"bCoef":1.6,"cMask":["wall"]},{"x":581.60000228882,"y":-35.78494018297,"bCoef":0,"cMask":["wall"]},{"x":542.60000228882,"y":-38.568754398311,"bCoef":0,"cMask":["wall"]},{"x":530.60000228882,"y":-53.415763546798,"bCoef":1.6,"cMask":["wall"]},{"x":562.60000228882,"y":-53.415763546798,"bCoef":1.6,"cMask":["wall"]},{"x":522,"y":163.02941645408,"bCoef":1.6,"cMask":["wall"]},{"x":529,"y":-51.324278127199,"bCoef":1.6,"cMask":["wall"]},{"x":555,"y":193.65137282284,"bCoef":1.6,"cMask":["wall"]},{"x":558,"y":-24.414074045567,"bCoef":1.6,"cMask":["wall"]},{"x":598,"y":-23.486135973786,"bCoef":1.6,"cMask":["wall"]},{"x":565,"y":-50.396340055419,"bCoef":1.6,"cMask":["wall"]},{"x":635,"y":194.57931089462,"bCoef":1.6,"cMask":["wall"]},{"x":519.5,"y":162.33346290025,"bCoef":1.6,"cMask":["wall"]},{"x":526.5,"y":-52.948169752815,"bCoef":1.6,"cMask":["red","blue","ball"]},{"x":566.5,"y":-52.020231681034,"bCoef":1.6,"cMask":["red","blue","ball"]},{"x":600.5,"y":-23.254151455841,"bCoef":1.6,"cMask":["red","blue","ball"]},{"x":638.5,"y":192.955419269,"bCoef":0,"cMask":["red","blue","ball"]},{"x":631.5,"y":192.955419269,"bCoef":1.6,"cMask":["wall"]},{"x":594.5,"y":-20.4703372405,"bCoef":1.6,"cMask":["wall"]},{"x":561.5,"y":-20.4703372405,"bCoef":1.6,"cMask":["wall"]},{"x":558.5,"y":193.88335734078,"bCoef":1.6,"cMask":["wall"]},{"x":552.5,"y":192.955419269,"bCoef":1.6,"cMask":["wall"]},{"x":555.5,"y":-21.39827531228,"bCoef":1.6,"cMask":["wall"]},{"x":531.5,"y":-45.524665178571,"bCoef":1.6,"cMask":["wall"]},{"x":524.5,"y":161.40552482847,"bCoef":1.6,"cMask":["wall"]},{"x":560.5,"y":-26.037965671182,"bCoef":1.6,"cMask":["red","blue","wall"]},{"x":534.5,"y":-48.308479393913,"bCoef":1.6,"cMask":["red","blue","wall"]},{"x":563.5,"y":-47.380541322132,"bCoef":1.6,"cMask":["wall"]},{"x":590.5,"y":-25.110027599402,"bCoef":1.6,"cMask":["wall"]},{"x":565.18181610107,"y":-45.143414255098,"bCoef":1.6,"cMask":["wall"]},{"x":529.18181610107,"y":-28.44052896305,"bCoef":1.6,"cMask":["wall"]},{"x":554.18181610107,"y":-15.449395958124,"bCoef":1.6,"cMask":["wall"]},{"x":528.18181610107,"y":-1.5303248814174,"bCoef":1.6,"cMask":["wall"]},{"x":554.18181610107,"y":15.17256041063,"bCoef":1.6,"cMask":["wall"]},{"x":527.18181610107,"y":28.163693415557,"bCoef":1.6,"cMask":["wall"]},{"x":554.18181610107,"y":45.794516779385,"bCoef":1.6,"cMask":["wall"]},{"x":527.18181610107,"y":59.713587856091,"bCoef":1.6,"cMask":["wall"]},{"x":552.18181610107,"y":77.34441121992,"bCoef":1.6,"cMask":["wall"]},{"x":526.18181610107,"y":91.263482296626,"bCoef":1.6,"cMask":["wall"]},{"x":551.18181610107,"y":108.89430566045,"bCoef":1.6,"cMask":["wall"]},{"x":525.18181610107,"y":125.5971909525,"bCoef":1.6,"cMask":["wall"]},{"x":552.18181610107,"y":143.22801431633,"bCoef":1.6,"cMask":["wall"]},{"x":524.18181610107,"y":159.0029615366,"bCoef":1.6,"cMask":["wall"]},{"x":529,"y":-51.324278127199,"bCoef":1.6,"cMask":["wall"]},{"x":558,"y":-24.414074045567,"bCoef":1.6,"cMask":["wall"]},{"x":560.5,"y":-26.037965671182,"bCoef":1.6,"cMask":["red","blue","wall"]},{"x":534.5,"y":-48.308479393913,"bCoef":1.6,"cMask":["red","blue","wall"]},{"x":555.5,"y":-21.39827531228,"bCoef":0,"cMask":["red","blue","ball"]},{"x":531.5,"y":-45.524665178571,"bCoef":0,"cMask":["red","blue","ball"]},{"x":531.5,"y":-45.524665178571,"bCoef":1.6,"cMask":["wall"]},{"x":524.5,"y":161.40552482847,"bCoef":1.6,"cMask":["wall"]},{"x":552.5,"y":192.955419269,"bCoef":1.6,"cMask":["wall"]},{"x":555.5,"y":-21.39827531228,"bCoef":1.6,"cMask":["wall"]},{"x":-590.5,"y":-450.99609375,"bCoef":1.6,"cMask":["red","blue","ball"]},{"x":599.25,"y":-449.99609375,"bCoef":1.6,"cMask":["red","blue","ball"]},{"x":235,"y":187,"bCoef":1.6,"cMask":["wall"]},{"x":356,"y":187,"bCoef":1.6,"cMask":["wall"]},{"x":265,"y":189,"bCoef":1.6,"cMask":["wall"]},{"x":386,"y":189,"bCoef":1.6,"cMask":["wall"]},{"x":288,"y":191,"bCoef":1.6,"cMask":["wall"]},{"x":371,"y":191,"bCoef":1.6,"cMask":["wall"]},{"x":262,"y":185,"bCoef":1.6,"cMask":["wall"]},{"x":345,"y":185,"bCoef":1.6,"cMask":["wall"]},{"x":-502,"y":168,"bCoef":1.6,"cMask":["wall"]},{"x":-446,"y":167,"bCoef":1.6,"cMask":["wall"]},{"x":-541,"y":170,"bCoef":1.6,"cMask":["wall"]},{"x":-419,"y":169,"bCoef":1.6,"cMask":["wall"]},{"x":-531,"y":172,"bCoef":1.6,"cMask":["wall"]},{"x":-409,"y":171,"bCoef":1.6,"cMask":["wall"]},{"x":-554,"y":203.66668701172,"bCoef":1.6,"cMask":["wall"]},{"x":-506,"y":155.66668701172,"bCoef":1.6,"cMask":["wall"]}],"segments":[{"v0":0,"v1":1,"bCoef":1.6,"cMask":["wall"],"color":"111C70"},{"v0":1,"v1":2,"bCoef":1.6,"cMask":["wall"],"color":"111C70"},{"v0":3,"v1":4,"bCoef":1.6,"cMask":["wall"],"color":"111C70"},{"v0":5,"v1":6,"bCoef":1.6,"cMask":["wall"],"color":"111C70"},{"v0":6,"v1":7,"bCoef":1.6,"cMask":["wall"],"color":"111C70"},{"v0":7,"v1":8,"bCoef":1.6,"cMask":["wall"],"color":"111C70"},{"v0":10,"v1":9,"bCoef":1.6,"curve":-155.75322229945,"curveF":-0.2148084352851468,"cMask":["wall"],"color":"111C70"},{"v0":9,"v1":10,"bCoef":1.6,"curve":174.75279966293002,"curveF":0.045822492027407645,"cMask":["wall"],"color":"111C70"},{"v0":11,"v1":12,"bCoef":1.6,"cMask":["wall"],"color":"111C70"},{"v0":16,"v1":15,"bCoef":1.6,"cMask":["wall"],"color":"855C15"},{"v0":18,"v1":17,"bCoef":1.6,"cMask":["wall"],"color":"3F414D"},{"v0":20,"v1":19,"bCoef":1.6,"cMask":["wall"],"color":"252749"},{"v0":22,"v1":21,"bCoef":1.6,"cMask":["wall"],"color":"477125"},{"v0":24,"v1":23,"bCoef":1.6,"cMask":["wall"],"color":"547023"},{"v0":26,"v1":25,"bCoef":1.6,"cMask":["wall"],"color":"477125"},{"v0":28,"v1":27,"bCoef":1.6,"cMask":["wall"],"color":"457328"},{"v0":30,"v1":29,"bCoef":1.6,"cMask":["wall"],"color":"457328"},{"v0":33,"v1":32,"bCoef":1.6,"cMask":["wall"],"color":"5A8F2F"},{"v0":35,"v1":34,"bCoef":1.6,"cMask":["wall"],"color":"5D9431"},{"v0":37,"v1":36,"bCoef":1.6,"cMask":["wall"],"color":"5F9631"},{"v0":40,"v1":39,"bCoef":1.6,"cMask":["wall"],"color":"477125"},{"v0":42,"v1":41,"bCoef":1.6,"cMask":["wall"],"color":"547023"},{"v0":44,"v1":43,"bCoef":1.6,"cMask":["wall"],"color":"477125"},{"v0":46,"v1":45,"bCoef":1.6,"cMask":["wall"],"color":"477125"},{"v0":48,"v1":47,"bCoef":1.6,"cMask":["wall"],"color":"547023"},{"v0":50,"v1":49,"bCoef":1.6,"cMask":["wall"],"color":"477125"},{"v0":52,"v1":51,"bCoef":1.6,"cMask":["wall"],"color":"457328"},{"v0":54,"v1":53,"bCoef":1.6,"cMask":["wall"],"color":"457328"},{"v0":56,"v1":55,"bCoef":1.6,"cMask":["wall"],"color":"5B9130"},{"v0":57,"v1":58,"bCoef":1.6,"cMask":["wall"],"color":"B5D394"},{"v0":65,"v1":64,"bCoef":1.6,"cMask":["wall"],"color":"5A8F2F"},{"v0":67,"v1":66,"bCoef":1.6,"cMask":["wall"],"color":"5D9431"},{"v0":69,"v1":68,"bCoef":1.6,"cMask":["wall"],"color":"5F9631"},{"v0":72,"v1":71,"bCoef":1.6,"cMask":["wall"],"color":"5B9130"},{"v0":74,"v1":73,"bCoef":1.6,"cMask":["wall"],"color":"477125"},{"v0":76,"v1":75,"bCoef":1.6,"cMask":["wall"],"color":"547023"},{"v0":78,"v1":77,"bCoef":1.6,"cMask":["wall"],"color":"477125"},{"v0":80,"v1":79,"bCoef":1.6,"cMask":["wall"],"color":"457328"},{"v0":82,"v1":81,"bCoef":1.6,"cMask":["wall"],"color":"457328"},{"v0":58,"v1":84,"bCoef":1.6,"cMask":["wall"],"color":"B5D394"},{"v0":85,"v1":86,"bCoef":1.6,"curve":19.455157102803,"curveF":5.833333333333397,"cMask":["wall"],"color":"B5D394"},{"v0":88,"v1":87,"bCoef":1.6,"curve":22.365621018731,"curveF":5.058333333333259,"cMask":["wall"],"color":"B5D394"},{"v0":89,"v1":90,"bCoef":1.6,"cMask":["wall"],"color":"B5D394"},{"v0":83,"v1":84,"bCoef":1.6,"cMask":["wall"],"color":"B5D394"},{"v0":92,"v1":93,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":94,"v1":95,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":96,"v1":97,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":98,"v1":99,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":100,"v1":101,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":102,"v1":103,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":104,"v1":105,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":106,"v1":107,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":101,"v1":106,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":99,"v1":104,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":97,"v1":102,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":93,"v1":100,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":95,"v1":98,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":96,"v1":108,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":94,"v1":109,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":103,"v1":107,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":107,"v1":110,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":107,"v1":111,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":110,"v1":112,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":111,"v1":113,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":114,"v1":115,"bCoef":1.6,"cMask":["wall"],"color":"D6D7D6"},{"v0":116,"v1":117,"bCoef":1.6,"cMask":["wall"],"color":"D6D7D6"},{"v0":117,"v1":118,"bCoef":1.6,"cMask":["wall"],"color":"D6D7D6"},{"v0":115,"v1":119,"bCoef":1.6,"cMask":["wall"],"color":"EEEEEE"},{"v0":118,"v1":120,"bCoef":1.6,"cMask":["wall"],"color":"D6D7D6"},{"v0":118,"v1":119,"bCoef":1.6,"cMask":["wall"],"color":"EEEEEE"},{"v0":121,"v1":122,"bCoef":1.6,"cMask":["wall"],"color":"515251"},{"v0":122,"v1":123,"bCoef":1.6,"cMask":["red","blue","ball"],"color":"414241"},{"v0":123,"v1":124,"bCoef":1.6,"cMask":["red","blue","ball"],"color":"303030"},{"v0":124,"v1":125,"bCoef":0,"cMask":["red","blue","ball"],"color":"303030"},{"v0":126,"v1":127,"bCoef":1.6,"cMask":["wall"],"color":"414241"},{"v0":127,"v1":128,"bCoef":1.6,"cMask":["wall"],"color":"414241"},{"v0":128,"v1":129,"bCoef":1.6,"cMask":["wall"],"color":"515251"},{"v0":135,"v1":136,"bCoef":1.6,"cMask":["wall"],"color":"414241"},{"v0":136,"v1":137,"bCoef":1.6,"cMask":["wall"],"color":"414241"},{"v0":137,"v1":134,"bCoef":1.6,"cMask":["wall"],"color":"414241"},{"v0":129,"v1":130,"bCoef":1.6,"cMask":["wall"],"color":"515251"},{"v0":133,"v1":121,"bCoef":1.6,"cMask":["wall"],"color":"515251"},{"v0":125,"v1":126,"bCoef":1.6,"cMask":["wall"],"color":"515251"},{"v0":138,"v1":139,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":139,"v1":140,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":140,"v1":141,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":141,"v1":142,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":142,"v1":143,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":143,"v1":144,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":144,"v1":145,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":145,"v1":146,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":146,"v1":147,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":147,"v1":148,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":148,"v1":149,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":149,"v1":150,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":150,"v1":151,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":153,"v1":152,"bCoef":1.6,"cMask":["wall"],"color":"D6D7D6"},{"v0":154,"v1":155,"bCoef":1.6,"cMask":["red","blue","wall"],"color":"515251"},{"v0":156,"v1":157,"bCoef":0,"cMask":["red","blue","ball"],"color":"515251"},{"v0":158,"v1":159,"bCoef":1.6,"cMask":["wall"],"color":"515251"},{"v0":160,"v1":161,"bCoef":1.6,"cMask":["wall"],"color":"515251"},{"v0":162,"v1":163,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":164,"v1":165,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":166,"v1":167,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":168,"v1":169,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":170,"v1":171,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":172,"v1":173,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":174,"v1":175,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":176,"v1":177,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":171,"v1":176,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":169,"v1":174,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":167,"v1":172,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":163,"v1":170,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":165,"v1":168,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":166,"v1":178,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":164,"v1":179,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":173,"v1":177,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":177,"v1":180,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":177,"v1":181,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":180,"v1":182,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":181,"v1":183,"bCoef":1.6,"cMask":["wall"],"color":"7B7D7B"},{"v0":184,"v1":185,"bCoef":1.6,"cMask":["wall"],"color":"D6D7D6"},{"v0":186,"v1":187,"bCoef":1.6,"cMask":["wall"],"color":"D6D7D6"},{"v0":187,"v1":188,"bCoef":1.6,"cMask":["wall"],"color":"D6D7D6"},{"v0":185,"v1":189,"bCoef":1.6,"cMask":["wall"],"color":"EEEEEE"},{"v0":188,"v1":190,"bCoef":1.6,"cMask":["wall"],"color":"D6D7D6"},{"v0":188,"v1":189,"bCoef":1.6,"cMask":["wall"],"color":"EEEEEE"},{"v0":191,"v1":192,"bCoef":1.6,"cMask":["wall"],"color":"515251"},{"v0":192,"v1":193,"bCoef":1.6,"cMask":["red","blue","ball"],"color":"414241"},{"v0":193,"v1":194,"bCoef":1.6,"cMask":["red","blue","ball"],"color":"303030"},{"v0":194,"v1":195,"bCoef":0,"cMask":["red","blue","ball"],"color":"303030"},{"v0":196,"v1":197,"bCoef":1.6,"cMask":["wall"],"color":"414241"},{"v0":197,"v1":198,"bCoef":1.6,"cMask":["wall"],"color":"414241"},{"v0":198,"v1":199,"bCoef":1.6,"cMask":["wall"],"color":"515251"},{"v0":205,"v1":206,"bCoef":1.6,"cMask":["wall"],"color":"414241"},{"v0":206,"v1":207,"bCoef":1.6,"cMask":["wall"],"color":"414241"},{"v0":207,"v1":204,"bCoef":1.6,"cMask":["wall"],"color":"414241"},{"v0":199,"v1":200,"bCoef":1.6,"cMask":["wall"],"color":"515251"},{"v0":203,"v1":191,"bCoef":1.6,"cMask":["wall"],"color":"515251"},{"v0":195,"v1":196,"bCoef":1.6,"cMask":["wall"],"color":"515251"},{"v0":208,"v1":209,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":209,"v1":210,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":210,"v1":211,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":211,"v1":212,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":212,"v1":213,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":213,"v1":214,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":214,"v1":215,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":215,"v1":216,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":216,"v1":217,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":217,"v1":218,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":218,"v1":219,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":219,"v1":220,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":220,"v1":221,"bCoef":1.6,"cMask":["wall"],"color":"9EA19E"},{"v0":223,"v1":222,"bCoef":1.6,"cMask":["wall"],"color":"D6D7D6"},{"v0":224,"v1":225,"bCoef":1.6,"cMask":["red","blue","wall"],"color":"515251"},{"v0":226,"v1":227,"bCoef":0,"cMask":["red","blue","ball"],"color":"515251"},{"v0":228,"v1":229,"bCoef":1.6,"cMask":["wall"],"color":"515251"},{"v0":230,"v1":231,"bCoef":1.6,"cMask":["wall"],"color":"515251"},{"v0":124,"v1":232,"bCoef":1.6,"vis":false,"cMask":["red","blue","ball"]},{"v0":194,"v1":233,"bCoef":1.6,"vis":false,"cMask":["red","blue","ball"]},{"v0":232,"v1":233,"bCoef":1.6,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue","ball"]},{"v0":234,"v1":235,"bCoef":1.6,"cMask":["wall"],"color":"BF8644"},{"v0":236,"v1":237,"bCoef":1.6,"cMask":["wall"],"color":"B47E40"},{"v0":238,"v1":239,"bCoef":1.6,"cMask":["wall"],"color":"BF8644"},{"v0":240,"v1":241,"bCoef":1.6,"cMask":["wall"],"color":"C78C47"},{"v0":242,"v1":243,"bCoef":1.6,"cMask":["wall"],"color":"B47E40"},{"v0":244,"v1":245,"bCoef":1.6,"cMask":["wall"],"color":"BF8644"},{"v0":246,"v1":247,"bCoef":1.6,"cMask":["wall"],"color":"C78C47"},{"v0":248,"v1":249,"bCoef":1.6,"cMask":["wall"],"color":"B5D394"}],"planes":[{"normal":[0,1],"dist":-523.21180725098},{"normal":[0,-1],"dist":-173.66668701172,"bCoef":1.6,"cMask":["red","blue","ball"]},{"normal":[0,-1],"dist":-175.75390625,"bCoef":1.6,"cMask":["red","blue","ball"]}],"goals":[{"p0":[-532.5,182.00390625],"p1":[-537.5,-45.99609375],"team":"red"},{"p0":[541.25,181.00390625],"p1":[544.25,-30.99609375],"team":"blue"}],"discs":[{"gravity":[0,0.2],"radius":14,"bCoef":1,"damping":0.98,"cGroup":["ball","kick","score"]},{"pos":[-193,-209],"radius":3,"color":"D9D5F7","cMask":["wall"]},{"pos":[205.66666412354,-207.33332824707],"radius":2,"color":"D9D5F7","cMask":["wall"]},{"pos":[-541.33333587646,-204.33332824707],"radius":2,"color":"D9D5F7","cMask":["wall"]},{"pos":[-323.33333587646,-149.33332824707],"radius":1.5,"color":"D9D5F7","cMask":["wall"]},{"pos":[-131.33333587646,-147.33332824707],"radius":3,"color":"D9D5F7","cMask":["wall"]},{"pos":[394.66666412354,-192.33332824707],"radius":2.8,"color":"D9D5F7","cMask":["wall"]},{"pos":[557.66666412354,-182.33332824707],"radius":2.7,"color":"D9D5F7","cMask":["wall"]},{"pos":[289.66666412354,-168.33332824707],"radius":2.5,"color":"D9D5F7","cMask":["wall"]},{"pos":[-437.33333587646,-193.33332824707],"radius":2,"color":"D9D5F7","cMask":["wall"]},{"pos":[72,-210],"radius":3,"color":"D9D5F7","cMask":["wall"]},{"pos":[-497,-151],"radius":3,"color":"D9D5F7","cMask":["wall"]},{"pos":[473.66666412354,-215.33332824707],"radius":2,"color":"D9D5F7","cMask":["wall"]},{"pos":[504.66666412354,-153.33332824707],"radius":2,"color":"D9D5F7","cMask":["wall"]},{"pos":[-321,-213],"radius":3,"color":"D9D5F7","cMask":["wall"]}],"playerPhysics":{"bCoef":1.2,"invMass":0.7,"damping":0.97,"acceleration":0.12,"kickStrength":10,"gravity":[0,0.2],"radius":20},"ballPhysics":"disc0","spawnDistance":250,"redSpawnPoints":[[-140,20],[-210,20],[-280,20],[-490,250]],"blueSpawnPoints":[[140,20],[210,20],[280,20],[490,250]]}',
	'REACTOR': '{"name":"Reactor","width":1000,"height":500,"bg":{"type":"hockey","width":40,"height":40,"kickOffRadius":20,"cornerRadius":40},"vertexes":[{"x":500,"y":250,"cMask":["ball"]},{"x":-500,"y":250,"cMask":["ball"]},{"x":-600,"y":100},{"x":-600,"y":-100},{"x":-500,"y":-250,"cMask":["ball"]},{"x":-150,"y":250,"cMask":["ball"]},{"x":-100,"y":250,"cMask":["ball"]},{"x":150,"y":250,"cMask":["ball"]},{"x":100,"y":250,"cMask":["ball"]},{"x":100,"y":-250,"cMask":["ball"]},{"x":150,"y":-250,"cMask":["ball"]},{"x":500,"y":100},{"x":600,"y":100},{"x":600,"y":-100},{"x":500,"y":-100},{"x":500,"y":-250,"cMask":["ball"]},{"x":-500,"y":100,"bCoef":0.5},{"x":-500,"y":-100,"bCoef":0.5},{"x":-800,"y":100},{"x":-800,"y":-100},{"x":800,"y":100},{"x":800,"y":-100},{"x":-700,"y":-30,"bCoef":0.8,"cMask":["wall"],"cGroup":["ball"]},{"x":-700,"y":30,"bCoef":0.8,"cMask":["wall"],"cGroup":["ball"]},{"x":-700,"y":-60,"bCoef":0.8,"cMask":["wall"],"cGroup":["ball"]},{"x":-700,"y":60,"bCoef":0.8,"cMask":["wall"],"cGroup":["ball"]},{"x":-100,"y":-250,"cMask":["ball"]},{"x":-150,"y":-250,"cMask":["ball"]},{"x":700,"y":-30,"bCoef":0.8,"cMask":["wall"],"cGroup":["ball"]},{"x":700,"y":30,"bCoef":0.8,"cMask":["wall"],"cGroup":["ball"]},{"x":700,"y":-60,"bCoef":0.8,"cMask":["wall"],"cGroup":["ball"]},{"x":700,"y":60,"bCoef":0.8,"cMask":["wall"],"cGroup":["ball"]},{"x":-838,"y":15},{"x":-820,"y":0},{"x":838,"y":-15},{"x":820,"y":0},{"x":838,"y":15},{"x":-838,"y":-15},{"x":503,"y":118},{"x":612,"y":118},{"x":503,"y":-118},{"x":612,"y":-118},{"x":-503,"y":118},{"x":-612,"y":118},{"x":-503,"y":-118},{"x":-612,"y":-118},{"x":680,"y":0,"bCoef":0,"cMask":["wall"]},{"x":720,"y":0,"bCoef":0,"cMask":["wall"]},{"x":678,"y":0,"bCoef":-2.8,"cMask":["wall"]},{"x":722,"y":0,"bCoef":-2.8,"cMask":["wall"]},{"x":-720,"y":0,"bCoef":0,"cMask":["wall"]},{"x":-680,"y":0,"bCoef":0,"cMask":["wall"]},{"x":-722,"y":0,"bCoef":-2.8,"cMask":["wall"]},{"x":-678,"y":0,"bCoef":-2.8,"cMask":["wall"]},{"x":875,"y":-200},{"x":875,"y":200},{"x":600,"y":200,"bCoef":0.1,"cMask":[]},{"x":560,"y":140,"bCoef":0.1,"cMask":[]},{"x":563,"y":164,"bCoef":0.1,"cMask":[]},{"x":580,"y":153,"bCoef":0.1,"cMask":[]},{"x":600,"y":-200,"bCoef":0.1,"cMask":[]},{"x":560,"y":-140,"bCoef":0.1,"cMask":[]},{"x":563,"y":-164,"bCoef":0.1,"cMask":[]},{"x":580,"y":-153,"bCoef":0.1,"cMask":[]},{"x":-875,"y":-200},{"x":-875,"y":200},{"x":-600,"y":200,"bCoef":0.1,"cMask":[]},{"x":-560,"y":140,"bCoef":0.1,"cMask":[]},{"x":-563,"y":164,"bCoef":0.1,"cMask":[]},{"x":-580,"y":153,"bCoef":0.1,"cMask":[]},{"x":-600,"y":-200,"bCoef":0.1,"cMask":[]},{"x":-560,"y":-140,"bCoef":0.1,"cMask":[]},{"x":-563,"y":-164,"bCoef":0.1,"cMask":[]},{"x":-580,"y":-153,"bCoef":0.1,"cMask":[]},{"x":-503,"y":120,"bCoef":0.1,"cMask":[]},{"x":503,"y":120,"bCoef":0.1,"cMask":[]},{"x":503,"y":103,"bCoef":0.1,"cMask":[]},{"x":598,"y":103,"bCoef":0.1,"cMask":[]},{"x":802,"y":103,"bCoef":0.1,"cMask":[]},{"x":802,"y":-103,"bCoef":0.1,"cMask":[]},{"x":598,"y":-103,"bCoef":0.1,"cMask":[]},{"x":503,"y":-103,"bCoef":0.1,"cMask":[]},{"x":503,"y":-120,"bCoef":0.1,"cMask":[]},{"x":-503,"y":-120,"bCoef":0.1,"cMask":[]},{"x":-503,"y":-103,"bCoef":0.1,"cMask":[]},{"x":-598,"y":-103,"bCoef":0.1,"cMask":[]},{"x":-802,"y":-103,"bCoef":0.1,"cMask":[]},{"x":-802,"y":103,"bCoef":0.1,"cMask":[]},{"x":-598,"y":103,"bCoef":0.1,"cMask":[]},{"x":-503,"y":103,"bCoef":0.1,"cMask":[]},{"x":-503,"y":120},{"x":-530,"y":160},{"x":-530,"y":280},{"x":530,"y":280},{"x":530,"y":160},{"x":503,"y":120},{"x":-503,"y":-120},{"x":-530,"y":-160},{"x":-530,"y":-280},{"x":530,"y":-280},{"x":530,"y":-160},{"x":503,"y":-120},{"x":-600,"y":100},{"x":-620,"y":95},{"x":-628,"y":124},{"x":-600,"y":-100},{"x":-620,"y":-95},{"x":-628,"y":-124},{"x":-765,"y":125,"bCoef":0.1,"cMask":["wall"]},{"x":-755,"y":107,"bCoef":0.1,"cMask":["wall"]},{"x":600,"y":100},{"x":620,"y":95},{"x":628,"y":124},{"x":600,"y":-100},{"x":620,"y":-95},{"x":628,"y":-124},{"x":-595,"y":-110,"bCoef":-2.8,"cMask":["wall"]},{"x":-595,"y":110,"bCoef":-2.8,"cMask":["wall"]},{"x":595,"y":-110,"bCoef":-2.8,"cMask":["wall"]},{"x":595,"y":110,"bCoef":-2.8,"cMask":["wall"]},{"x":-765,"y":-125,"bCoef":0.1,"cMask":["wall"]},{"x":-755,"y":-107,"bCoef":0.1,"cMask":["wall"]},{"x":765,"y":125,"bCoef":0.1,"cMask":["wall"]},{"x":755,"y":107,"bCoef":0.1,"cMask":["wall"]},{"x":765,"y":-125,"bCoef":0.1,"cMask":["wall"]},{"x":755,"y":-107,"bCoef":0.1,"cMask":["wall"]},{"x":0,"y":-30,"bCoef":0.8,"cMask":["wall"],"cGroup":["ball"]},{"x":0,"y":30,"bCoef":0.8,"cMask":["wall"],"cGroup":["ball"]},{"x":0,"y":-60,"bCoef":0.8,"cMask":["wall"],"cGroup":["ball"]},{"x":0,"y":60,"bCoef":0.8,"cMask":["wall"],"cGroup":["ball"]}],"segments":[{"v0":117,"v1":116,"bCoef":-2.8,"curve":-94.00000000000001,"curveF":-0.9325150861376614,"vis":false,"cMask":["wall"],"color":"DEDEDE"},{"v0":3,"v1":2,"curve":85,"curveF":1.0913085010692714,"cMask":["red","blue"],"color":"884444"},{"v0":5,"v1":6,"cMask":["ball"],"color":"DEDEDE"},{"v0":0,"v1":7,"cMask":["ball"],"color":"4466CC"},{"v0":8,"v1":7,"cMask":["ball"],"color":"DEDEDE"},{"v0":9,"v1":10,"cMask":["ball"],"color":"DEDEDE"},{"v0":11,"v1":12,"color":"4466CC"},{"v0":12,"v1":13,"curve":85,"curveF":1.0913085010692714,"cMask":["red","blue"],"color":"526278"},{"v0":13,"v1":14,"color":"4466CC"},{"v0":15,"v1":10,"cMask":["ball"],"color":"4466CC"},{"v0":2,"v1":16,"color":"CC4444"},{"v0":16,"v1":1,"cMask":["ball"],"color":"CC4444"},{"v0":3,"v1":17,"color":"CC4444"},{"v0":17,"v1":4,"cMask":["ball"],"color":"CC4444"},{"v0":2,"v1":18,"curve":95,"curveF":0.9163311740174233,"color":"CC4444"},{"v0":19,"v1":3,"curve":95,"curveF":0.9163311740174233,"color":"CC4444"},{"v0":20,"v1":12,"curve":95,"curveF":0.9163311740174233,"color":"4466CC"},{"v0":13,"v1":21,"curve":95,"curveF":0.9163311740174233,"color":"4466CC"},{"v0":21,"v1":20,"curve":85,"curveF":1.0913085010692714,"color":"4466CC"},{"v0":18,"v1":19,"curve":85,"curveF":1.0913085010692714,"color":"CC4444"},{"v0":23,"v1":22,"bCoef":0.8,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["wall"],"cGroup":["ball"],"color":"DEDEDE"},{"v0":22,"v1":23,"bCoef":0.8,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["wall"],"cGroup":["ball"],"color":"DEDEDE"},{"v0":25,"v1":24,"bCoef":0.8,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["wall"],"cGroup":["ball"],"color":"DEDEDE"},{"v0":24,"v1":25,"bCoef":0.8,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["wall"],"cGroup":["ball"],"color":"DEDEDE"},{"v0":1,"v1":5,"cMask":["ball"],"color":"CC4444"},{"v0":6,"v1":8,"cMask":["ball"],"color":"DEDEDE"},{"v0":9,"v1":26,"cMask":["ball"],"color":"DEDEDE"},{"v0":4,"v1":27,"cMask":["ball"],"color":"CC4444"},{"v0":26,"v1":27,"cMask":["ball"],"color":"DEDEDE"},{"v0":11,"v1":0,"cMask":["ball"],"color":"4466CC"},{"v0":14,"v1":15,"cMask":["ball"],"color":"4466CC"},{"v0":29,"v1":28,"bCoef":0.8,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["wall"],"cGroup":["ball"],"color":"DEDEDE"},{"v0":28,"v1":29,"bCoef":0.8,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["wall"],"cGroup":["ball"],"color":"DEDEDE"},{"v0":31,"v1":30,"bCoef":0.8,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["wall"],"cGroup":["ball"],"color":"DEDEDE"},{"v0":30,"v1":31,"bCoef":0.8,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["wall"],"cGroup":["ball"],"color":"DEDEDE"},{"v0":32,"v1":33,"curve":89.99999999999999,"curveF":1.0000000000000002,"color":"CC4444"},{"v0":34,"v1":35,"curve":89.99999999999999,"curveF":1.0000000000000002,"color":"4466CC"},{"v0":35,"v1":36,"curve":89.99999999999999,"curveF":1.0000000000000002,"color":"4466CC"},{"v0":33,"v1":37,"curve":89.99999999999999,"curveF":1.0000000000000002,"color":"CC4444"},{"v0":38,"v1":39,"bCoef":-2.8,"color":"DEDEDE"},{"v0":40,"v1":41,"bCoef":-2.8,"color":"DEDEDE"},{"v0":42,"v1":43,"bCoef":-2.8,"color":"DEDEDE"},{"v0":44,"v1":45,"bCoef":-2.8,"color":"DEDEDE"},{"v0":48,"v1":49,"bCoef":-2.8,"curve":180,"curveF":6.123233995736766e-17,"cMask":["wall"],"color":"EEEEEE"},{"v0":46,"v1":47,"bCoef":0,"curve":180,"curveF":6.123233995736766e-17,"cMask":["wall"],"color":"222222"},{"v0":49,"v1":48,"bCoef":-2.8,"curve":180,"curveF":6.123233995736766e-17,"cMask":["wall"],"color":"EEEEEE"},{"v0":47,"v1":46,"bCoef":0,"curve":180,"curveF":6.123233995736766e-17,"cMask":["wall"],"color":"222222"},{"v0":52,"v1":53,"bCoef":-2.8,"curve":180,"curveF":6.123233995736766e-17,"cMask":["wall"],"color":"EEEEEE"},{"v0":50,"v1":51,"bCoef":0,"curve":180,"curveF":6.123233995736766e-17,"cMask":["wall"],"color":"222222"},{"v0":53,"v1":52,"bCoef":-2.8,"curve":180,"curveF":6.123233995736766e-17,"cMask":["wall"],"color":"EEEEEE"},{"v0":51,"v1":50,"bCoef":0,"curve":180,"curveF":6.123233995736766e-17,"cMask":["wall"],"color":"222222"},{"v0":54,"v1":55,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":55,"v1":56,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":56,"v1":57,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":57,"v1":58,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":57,"v1":59,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":54,"v1":60,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":60,"v1":61,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":61,"v1":62,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":61,"v1":63,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":64,"v1":65,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":65,"v1":66,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":66,"v1":67,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":67,"v1":68,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":67,"v1":69,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":64,"v1":70,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":70,"v1":71,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":71,"v1":72,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":71,"v1":73,"bCoef":0.1,"cMask":[],"color":"444444"},{"v0":75,"v1":76,"bCoef":0.1,"cMask":[],"color":"222222"},{"v0":76,"v1":77,"bCoef":0.1,"cMask":[],"color":"222222"},{"v0":78,"v1":77,"bCoef":0.1,"curve":95,"curveF":0.9163311740174233,"cMask":[],"color":"222222"},{"v0":79,"v1":78,"bCoef":0.1,"curve":85,"curveF":1.0913085010692714,"cMask":[],"color":"222222"},{"v0":80,"v1":79,"bCoef":0.1,"curve":95,"curveF":0.9163311740174233,"cMask":[],"color":"222222"},{"v0":80,"v1":81,"bCoef":0.1,"cMask":[],"color":"222222"},{"v0":81,"v1":82,"bCoef":0.1,"cMask":[],"color":"222222"},{"v0":83,"v1":84,"bCoef":0.1,"cMask":[],"color":"222222"},{"v0":84,"v1":85,"bCoef":0.1,"cMask":[],"color":"222222"},{"v0":86,"v1":85,"bCoef":0.1,"curve":95,"curveF":0.9163311740174233,"cMask":[],"color":"222222"},{"v0":87,"v1":86,"bCoef":0.1,"curve":85,"curveF":1.0913085010692714,"cMask":[],"color":"222222"},{"v0":88,"v1":87,"bCoef":0.1,"curve":95,"curveF":0.9163311740174233,"cMask":[],"color":"222222"},{"v0":88,"v1":89,"bCoef":0.1,"cMask":[],"color":"222222"},{"v0":89,"v1":74,"bCoef":0.1,"cMask":[],"color":"222222"},{"v0":90,"v1":91,"color":"222222"},{"v0":91,"v1":92,"color":"222222"},{"v0":92,"v1":93,"color":"222222"},{"v0":93,"v1":94,"color":"222222"},{"v0":94,"v1":95,"color":"222222"},{"v0":96,"v1":97,"color":"222222"},{"v0":97,"v1":98,"color":"222222"},{"v0":98,"v1":99,"color":"222222"},{"v0":99,"v1":100,"color":"222222"},{"v0":100,"v1":101,"color":"222222"},{"v0":102,"v1":103,"curve":45.00000000000001,"curveF":2.414213562373095,"color":"CC4444"},{"v0":103,"v1":104,"curve":89.99999999999999,"curveF":1.0000000000000002,"color":"CC4444"},{"v0":106,"v1":105,"curve":45.00000000000001,"curveF":2.414213562373095,"color":"CC4444"},{"v0":107,"v1":106,"curve":89.99999999999999,"curveF":1.0000000000000002,"color":"CC4444"},{"v0":108,"v1":109,"bCoef":-2.8,"vis":false,"cMask":["wall"],"color":"DEDEDE"},{"v0":111,"v1":110,"curve":45.00000000000001,"curveF":2.414213562373095,"color":"4466CC"},{"v0":112,"v1":111,"curve":89.99999999999999,"curveF":1.0000000000000002,"color":"4466CC"},{"v0":113,"v1":114,"curve":45.00000000000001,"curveF":2.414213562373095,"color":"4466CC"},{"v0":114,"v1":115,"curve":89.99999999999999,"curveF":1.0000000000000002,"color":"4466CC"},{"v0":118,"v1":119,"bCoef":-2.8,"curve":-94.00000000000001,"curveF":-0.9325150861376614,"vis":false,"cMask":["wall"],"color":"DEDEDE"},{"v0":120,"v1":121,"bCoef":-2.8,"vis":false,"cMask":["wall"],"color":"DEDEDE"},{"v0":122,"v1":123,"bCoef":-2.8,"vis":false,"cMask":["wall"],"color":"DEDEDE"},{"v0":124,"v1":125,"bCoef":-2.8,"vis":false,"cMask":["wall"],"color":"DEDEDE"},{"v0":127,"v1":126,"bCoef":0.8,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["wall"],"cGroup":["ball"],"color":"DEDEDE"},{"v0":126,"v1":127,"bCoef":0.8,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["wall"],"cGroup":["ball"],"color":"DEDEDE"},{"v0":129,"v1":128,"bCoef":0.8,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["wall"],"cGroup":["ball"],"color":"DEDEDE"},{"v0":128,"v1":129,"bCoef":0.8,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["wall"],"cGroup":["ball"],"color":"DEDEDE"}],"planes":[{"normal":[0,-1],"dist":-280},{"normal":[0,1],"dist":-280},{"normal":[1,0],"dist":-890,"cMask":["red","blue","wall"]},{"normal":[-1,0],"dist":-890,"cMask":["red","blue","wall"]}],"goals":[{"p0":[-680,-20],"p1":[-720,20],"team":"red"},{"p0":[680,-20],"p1":[720,20],"team":"blue"},{"p0":[-680,20],"p1":[-720,-20],"team":"red"},{"p0":[680,20],"p1":[720,-20],"team":"blue"}],"discs":[{"cMask":["red","blue","wall"],"cGroup":["ball","wall","kick","score"]},{"pos":[700,-45],"speed":[4,0],"radius":12,"bCoef":0.1,"invMass":0.000001,"damping":1.002,"color":"667788","cMask":["ball","wall"],"cGroup":["ball","wall"]},{"pos":[700,45],"speed":[-4,0],"radius":12,"bCoef":0.1,"invMass":0.000001,"damping":1.002,"color":"667788","cMask":["ball","wall"],"cGroup":["ball","wall"]},{"pos":[808,0],"speed":[-3,0],"radius":8,"bCoef":1,"invMass":0.1,"damping":0.999,"color":"667788","cMask":["red","wall"],"cGroup":["red","ball"]},{"pos":[621,-88],"speed":[3,3],"radius":8,"bCoef":1,"invMass":0.1,"damping":0.999,"color":"667788","cMask":["red","wall"],"cGroup":["red","ball"]},{"pos":[701,-121],"speed":[0,3],"radius":8,"bCoef":1,"invMass":0.1,"damping":0.999,"color":"667788","cMask":["red","wall"],"cGroup":["red","ball"]},{"pos":[781,-87],"speed":[-3,3],"radius":8,"bCoef":1,"invMass":0.1,"damping":0.999,"color":"667788","cMask":["red","wall"],"cGroup":["red","ball"]},{"pos":[583,3],"speed":[3,0],"radius":8,"bCoef":1,"invMass":0.1,"damping":0.999,"color":"667788","cMask":["red","wall"],"cGroup":["red","ball"]},{"pos":[617,85],"speed":[3,-3],"radius":8,"bCoef":1,"invMass":0.1,"damping":0.999,"color":"667788","cMask":["red","wall"],"cGroup":["red","ball"]},{"pos":[702,122],"speed":[0,-3],"radius":8,"bCoef":1,"invMass":0.1,"damping":0.999,"color":"667788","cMask":["red","wall"],"cGroup":["red","ball"]},{"pos":[782,84],"speed":[-3,-3],"radius":8,"bCoef":1,"invMass":0.1,"damping":0.999,"color":"667788","cMask":["red","wall"],"cGroup":["red","ball"]},{"pos":[-700,-45],"speed":[4,0],"radius":12,"bCoef":0.1,"invMass":0.000001,"damping":1.002,"color":"886666","cMask":["ball","wall"],"cGroup":["ball","wall"]},{"pos":[-700,45],"speed":[-4,0],"radius":12,"bCoef":0.1,"invMass":0.000001,"damping":1.002,"color":"886666","cMask":["ball","wall"],"cGroup":["ball","wall"]},{"pos":[-700,-127],"speed":[0,3],"radius":8,"bCoef":1,"invMass":0.1,"damping":0.999,"color":"886666","cMask":["red","wall"],"cGroup":["red","ball"]},{"pos":[-788,-86],"speed":[3,3],"radius":8,"bCoef":1,"invMass":0.1,"damping":0.999,"color":"886666","cMask":["red","wall"],"cGroup":["red","ball"]},{"pos":[-700,125],"speed":[0,-3],"radius":8,"bCoef":1,"invMass":0.1,"damping":0.999,"color":"886666","cMask":["red","wall"],"cGroup":["red","ball"]},{"pos":[-783,87],"speed":[3,-3],"radius":8,"bCoef":1,"invMass":0.1,"damping":0.999,"color":"886666","cMask":["red","wall"],"cGroup":["red","ball"]},{"pos":[-586,0],"speed":[-3,0],"radius":8,"bCoef":1,"invMass":0.1,"damping":0.999,"color":"886666","cMask":["red","wall"],"cGroup":["red","ball"]},{"pos":[-609,-79],"speed":[-3,3],"radius":8,"bCoef":1,"invMass":0.1,"damping":0.999,"color":"886666","cMask":["red","wall"],"cGroup":["red","ball"]},{"pos":[-604,79],"speed":[-3,-3],"radius":8,"bCoef":1,"invMass":0.1,"damping":0.999,"color":"886666","cMask":["red","wall"],"cGroup":["red","ball"]},{"pos":[-808,-2],"speed":[3,0],"radius":8,"bCoef":1,"invMass":0.1,"damping":0.999,"color":"886666","cMask":["red","wall"],"cGroup":["red","ball"]},{"pos":[-708,-8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"CC4444","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[-708,-8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"CC4444","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[-708,-8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"CC4444","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[-708,-8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"CC4444","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[-692,-8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"CC4444","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[-692,-8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"CC4444","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[-692,-8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"CC4444","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[-692,-8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"CC4444","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[-708,8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"CC4444","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[-708,8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"CC4444","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[-708,8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"CC4444","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[-708,8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"CC4444","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[-692,8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"CC4444","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[-692,8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"CC4444","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[-692,8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"CC4444","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[-692,8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"CC4444","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[708,-8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"4466CC","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[708,-8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"4466CC","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[708,-8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"4466CC","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[708,-8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"4466CC","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[692,-8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"4466CC","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[692,-8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"4466CC","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[692,-8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"4466CC","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[692,-8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"4466CC","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[708,8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"4466CC","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[708,8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"4466CC","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[708,8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"4466CC","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[708,8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"4466CC","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[692,8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"4466CC","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[692,8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"4466CC","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[692,8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"4466CC","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[692,8],"radius":6,"bCoef":1.2,"invMass":2,"damping":0.999,"color":"4466CC","cMask":["blue","ball"],"cGroup":["blue"]},{"pos":[-700,0],"radius":25,"invMass":0,"color":"CC4444","cMask":[]},{"pos":[700,0],"radius":25,"invMass":0,"color":"4466CC","cMask":[]},{"pos":[-500,100],"radius":6,"bCoef":0.6,"invMass":0},{"pos":[-500,-100],"radius":6,"bCoef":0.6,"invMass":0},{"pos":[500,100],"radius":6,"bCoef":0.6,"invMass":0},{"pos":[500,-100],"radius":6,"bCoef":0.6,"invMass":0},{"pos":[0,-45],"speed":[4,0],"radius":12,"bCoef":0.1,"invMass":0.000001,"damping":1.002,"color":"222222","cGroup":["ball","wall"]},{"pos":[0,45],"speed":[-4,0],"radius":12,"bCoef":0.1,"invMass":0.000001,"damping":1.002,"color":"222222","cGroup":["ball","wall"]}],"playerPhysics":{},"ballPhysics":"disc0","spawnDistance":170}',
	'SHOOTING GAME': '{"name":"Shooting game","width":430,"height":200,"bg":{"type":"hockey","width":300,"height":120},"vertexes":[{"x":-365,"y":-120,"bCoef":0.001,"cMask":["red","blue"]},{"x":-365,"y":120,"bCoef":0.001,"cMask":["red","blue"]},{"x":365,"y":-120,"bCoef":0.001,"cMask":["red","blue"]},{"x":365,"y":120,"bCoef":0.001,"cMask":["red","blue"]},{"x":-429,"y":-200,"bCoef":0.1,"cMask":["redKO"],"cGroup":["red"]},{"x":-429,"y":200,"bCoef":0.1,"cMask":["redKO"],"cGroup":["red"]},{"x":429,"y":-200,"bCoef":0.1,"cMask":["redKO"],"cGroup":["red"]},{"x":429,"y":200,"bCoef":0.1,"cMask":["redKO"],"cGroup":["red"]},{"x":0,"y":120,"bCoef":0.00001,"cMask":["red","blue"]},{"x":0,"y":200,"bCoef":0.00001,"cMask":["red","blue"]},{"x":0,"y":-120,"bCoef":0.00001,"cMask":["red","blue"]},{"x":0,"y":-200,"bCoef":0.00001,"cMask":["red","blue"]},{"x":-380,"y":-135,"cMask":["redKO"],"cGroup":["red"]},{"x":-380,"y":135,"cMask":["redKO"],"cGroup":["red"]},{"x":380,"y":-135,"cMask":["redKO"],"cGroup":["red"]},{"x":380,"y":135,"cMask":["redKO"],"cGroup":["red"]},{"x":-45,"y":148,"cMask":["redKO"],"cGroup":["red"]},{"x":-45,"y":183,"cMask":["redKO"],"cGroup":["red"]},{"x":-30,"y":163,"cMask":["redKO"],"cGroup":["red"]},{"x":-15,"y":148,"cMask":["redKO"],"cGroup":["red"]},{"x":-15,"y":183,"cMask":["redKO"],"cGroup":["red"]},{"x":15,"y":148,"cMask":["redKO"],"cGroup":["red"]},{"x":15,"y":183,"cMask":["redKO"],"cGroup":["red"]},{"x":40,"y":183,"cMask":["redKO"],"cGroup":["red"]},{"x":40,"y":148,"cMask":["redKO"],"cGroup":["red"]},{"x":40,"y":157,"cMask":["redKO"],"cGroup":["red"]},{"x":40,"y":174,"cMask":["redKO"],"cGroup":["red"]}],"segments":[{"v0":0,"v1":1,"bCoef":0.001,"cMask":["red","blue"],"color":"EAE374"},{"v0":2,"v1":3,"bCoef":0.001,"cMask":["red","blue"],"color":"EAE374"},{"v0":4,"v1":5,"bCoef":0.1,"cMask":["redKO"],"cGroup":["red"],"color":"FC913A"},{"v0":6,"v1":7,"bCoef":0.1,"cMask":["redKO"],"cGroup":["red"],"color":"FC913A"},{"v0":5,"v1":7,"bCoef":0.1,"cMask":["redKO"],"cGroup":["red"],"color":"FC913A"},{"v0":4,"v1":6,"bCoef":0.1,"cMask":["redKO"],"cGroup":["red"],"color":"FC913A"},{"v0":8,"v1":9,"bCoef":0.00001,"cMask":["red","blue"],"color":"FC913A"},{"v0":10,"v1":11,"bCoef":0.00001,"cMask":["red","blue"],"color":"FC913A"},{"v0":1,"v1":3,"bCoef":0.00001,"cMask":["red","blue"],"color":"EAE374"},{"v0":0,"v1":2,"cMask":["red","blue"],"color":"EAE374"},{"v0":13,"v1":12,"cMask":["redKO"],"cGroup":["red"],"color":"EEC010"},{"v0":14,"v1":15,"cMask":["redKO"],"cGroup":["red"],"color":"EEC010"},{"v0":15,"v1":13,"cMask":["redKO"],"cGroup":["red"],"color":"EEC010"},{"v0":12,"v1":14,"cMask":["redKO"],"cGroup":["red"],"color":"EEC010"},{"v0":16,"v1":17,"cMask":["redKO"],"cGroup":["red"],"color":"FFFFFF"},{"v0":16,"v1":18,"cMask":["redKO"],"cGroup":["red"],"color":"FFFFFF"},{"v0":18,"v1":19,"cMask":["redKO"],"cGroup":["red"],"color":"FFFFFF"},{"v0":19,"v1":20,"cMask":["redKO"],"cGroup":["red"],"color":"FFFFFF"},{"v0":21,"v1":22,"cMask":["redKO"],"cGroup":["red"],"color":"FFFFFF"},{"v0":22,"v1":23,"cMask":["redKO"],"cGroup":["red"],"color":"FFFFFF"},{"v0":21,"v1":24,"cMask":["redKO"],"cGroup":["red"],"color":"FFFFFF"},{"v0":24,"v1":25,"cMask":["redKO"],"cGroup":["red"],"color":"FFFFFF"},{"v0":23,"v1":26,"cMask":["redKO"],"cGroup":["red"],"color":"FFFFFF"}],"planes":[{"normal":[0,1],"dist":-135,"bCoef":0.07,"cMask":["ball"],"cGroup":["all"]},{"normal":[0,-1],"dist":-135,"bCoef":0.07,"cMask":["ball"],"cGroup":["all"]},{"normal":[0,1],"dist":-190,"bCoef":0.1,"cGroup":["all"]},{"normal":[0,-1],"dist":-190,"bCoef":0.1,"cGroup":["all"]},{"normal":[1,0],"dist":-430,"bCoef":0.1,"cGroup":["all"]},{"normal":[-1,0],"dist":-430,"bCoef":0.1,"cGroup":["all"]},{"normal":[-1,0],"dist":-380,"bCoef":0.000001,"cMask":["ball"],"cGroup":["all"]},{"normal":[1,0],"dist":-380,"bCoef":0.000001,"cMask":["ball"],"cGroup":["all"]}],"goals":[{"p0":[-300,-120],"p1":[-300,120],"team":"red"},{"p0":[300,120],"p1":[300,-120],"team":"blue"}],"discs":[{"radius":30,"invMass":0.06,"color":"C3B487","cGroup":["red","blue","ball","redKO","blueKO","wall","kick","score"]},{"pos":[-365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-365,-70],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[361,-1],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]},{"pos":[-361,1],"radius":15,"bCoef":5,"invMass":0.5,"damping":1,"color":"CB8B43","cMask":["red","blue"],"cGroup":["ball"]}],"playerPhysics":{"bCoef":1},"ballPhysics":"disc0","spawnDistance":410}'
};

// Tworzenie pokoju
let room = HBInit(
{
	roomName: roomName
	, maxPlayers: maxPlayers
	, public: roomPublic
	, playerName: hostName
	, geo: {'code': code, 'lat': lat, 'lon': lon}
	, noPlayer: hostHidden // SĘDZIA (nie) będzie widoczny w pokoju
});
room.setTeamsLock(false);
room.setScoreLimit(3);
room.setTimeLimit(3);
room.setDefaultStadium('Classic');
//room.setCustomStadium(maps['RS']);

// Przetłumaczalne teksty
let locStr =
{
	GK:
	{
		pl: 'Od bramki',
		en: 'Goal kick -'
	},
	CK:
	{
		pl: 'Rzut rożny dla',
		en: 'Corner kick -'
	},
	OUT:
	{
		pl: 'Aut dla',
		en: 'Throw-in -'
	},
	LINE:
	{
		pl: 'LINIA -',
		en: 'LINE -'
	},
	BACK:
	{
		pl: 'DO TYŁU',
		en: 'BACK'
	},
	FURTHER:
	{
		pl: 'DO PRZODU',
		en: 'FURTHER'
	},
	OK:
	{
		pl: 'OK',
		en: 'OK'
	},
	BAD_THROW_IN:
	{
		pl: '(BRAK KOPNIĘCIA)',
		en: '(BAD THROW-IN)'
	},
	WRONG_TEAM:
	{
		pl: 'NIE TA DRUŻYNA',
		en: 'WRONG TEAM'
	},
	WRONG_PLACE:
	{
		pl: 'NIE W TYM MIEJSCU',
		en: 'WRONG PLACE'
	},
	BALL_POSS:
	{
		pl: 'Posiadanie piłki',
		en: 'Ball possession'
	},
	LAST_BALL_POSS:
	{
		pl: 'Posiadanie piłki w ostatnim meczu',
		en: 'Ball possession in last match'
	},
	YOU_HAVE_NO_POWER_HERE:
	{
		pl: 'Nie. Nie wiemy, czy można ci ufać.',
		en: "You have no power here."
	},
	PRIV:
	{
		pl: '[PRYWATNA]',
		en: '[PM]',
		de: '[PN]',
		tr: '[ÖZEL]',
		it: '[MP]',
		lt: '[AŽ]',
		ru: '[ЛС]',
		ua: '[ПП]',
		cz: '[SZ]',
		sk: '[SS]'
	},
	ENABLED:
	{
		pl: 'włączone',
		en: 'enabled'
	},
	DISABLED:
	{
		pl: 'wyłączone',
		en: 'disabled'
	},
	BANS_CLEARED:
	{
		pl: 'Wyczyszczono bany',
		en: 'Bans cleared'
	},
	AUTO_BALL_POSS_DISPLAY:
	{
		pl: 'Automatyczne wyświetlanie posiadania piłki',
		en: 'Auto ball possession display'
	},
	RED_ARE:
	{
		pl: 'Czerwoni to',
		en: 'Reds are',
		de: 'Die Roten heißen'
	},
	BLUE_ARE:
	{
		pl: 'Niebiescy to',
		en: 'Blues are',
		de: 'Die Blauen heißen'
	},
	TYPO_POSSIBLE:
	{
		pl: 'Możliwa literówka',
		en: 'Did you make a typo?'
	},
	QUIET_E:
	{
		pl: 'Cicho e',
		en: 'Quiet e'
	},
	BALL_COLOR_CHANGED_TO:
	{
		pl: 'Zmieniono kolor piłki na',
		en: 'Ball color changed to'
	},
	BALL_COLOR_CHANGE_SUSPENDED:
	{
		pl: 'Kolor piłki zmieni się na pierwotny po bramce lub nowej grze',
		en: 'Ball color will change to default after a goal or new game'
	},
	BAN_AFTERMATH:
	{
		pl: 'Ta decyzja zmieni losy gry',
		en: 'This will have far-reaching consequences'
	},
	OG:
	{
		pl: '(sam.)',
		en: '(og.)',
		de: '(ET)',
		tr: '(kk)',
		it: '(aut.)',
		ru: '(авт.)',
		ua: '(авт.)',
		lt: '(į s.v.)',
		cz: '(vl.)'
	},
	DROPPED_BALL:
	{
		pl: 'RZUT SĘDZIOWSKI',
		en: 'DROPPED-BALL'
	},
	FAILED:
	{
		pl: 'Nie udało się',
		en: 'Failed'
	},
	GAME_MUST_BE_STOPPED:
	{
		pl: 'Gra musi być zatrzymana',
		en: 'Game must be stopped'
	},
	GAME_IS_STOPPED:
	{
		pl: 'Gra nie jest rozpoczęta',
		en: 'Game is stopped'
	},
	REF_CALLED_UP:
	{
		pl: 'Powołano sędziego Real Soccer',
		en: 'Called the Real Soccer referee up'
	},
	REF_DISMISSED:
	{
		pl: 'Odwołano sędziego Real Soccer',
		en: 'Dismissed the Real Soccer referee'
	},
	KICK_TOO_MANY_SWEAR:
	{
		pl: 'Za dużo wulgaryzmów w nazwie',
		en: 'Too many swear words'
	},
	KICK_NICK_CANNOT_START_WITH:
	{
		pl: 'Nazwa nie może zaczynać się na',
		en: 'Nickname cannot start with'
	},
	KICK_NICK_TAKEN:
	{
		pl: 'Nazwa zajęta',
		en: 'Nickname taken'
	},
	KICK_NICK_TRAILING_SPACES:
	{
		pl: 'Spacje na początku i na końcu nazwy są niedozwolone',
		en: 'Nickname cannot have leading or trailing spaces'
	},
	KICK_NICK_HAS_TOO_MANY_SPACES:
	{
		pl: 'Zbyt wiele spacji pod rząd w nazwie',
		en: 'Nickname has too many spaces in a row'
	},
	KICK_SAME_AUTH:
	{
		pl: 'Szybka wymiana',
		en: 'Quick sub'
	},
	WELCOME_CHECK_COMMANDS:
	{
		pl: 'Wpisz ! aby wyświetlić komendy',
		en: 'Type ! to show some commands',
		de: 'Tippe ! ein, um die Befehle anzuzeigen',
		tr: 'Yazmak ! komutları göstermek için'
	},
	IDENTICAL_COMMAND:
	{
		pl: 'Komenda tożsama',
		en: 'Identical command'
	},
	SEE_ALSO:
	{
		pl: 'Zobacz też',
		en: 'See also'
	},
	EXAMPLE_USE:
	{
		pl: 'Przykładowe użycie',
		en: 'Example use',
		de: 'Anwendungsbeispiel',
		tr: 'Örnek kullanım'
	},
	EXAMPLE_USES:
	{
		pl: 'Przykładowe użycia',
		en: 'Example uses',
		de: 'Anwendungsbeispiele',
		tr: 'Örnek kullanımlar'
	},
	COMMAND:
	{
		pl: 'komenda',
		en: 'command',
		de: 'Befehl',
		tr: 'komuta'
	},
	NICK:
	{
		pl: 'nazwa',
		en: 'nick',
		de: 'Name'
	},
	NAME:
	{
		pl: 'nazwa',
		en: 'name',
		de: 'Name'
	},
	CLUB:
	{
		pl: 'klub',
		en: 'club',
		de: 'Verein'
	},
	COMMANDS:
	{
		pl: 'Komendy',
		en: 'Commands',
		de: 'Befehle',
		tr: 'Komutlar'
	},
	POPULATION:
	{
		pl: 'Ludność',
		en: 'Population',
		de: 'Bevölkerung',
		tr: 'Nüfus'
	},
	ACTIVE:
	{
		pl: 'aktywni',
		en: 'active',
		de: 'aktiv',
		tr: 'aktif'
	},
	RECOMMENDED:
	{
		pl: 'Zalecana gra',
		en: 'Recommended',
		de: 'Empfohlenes Spiel',
		tr: 'Önerilen oyun'
	},
	VS:
	{
		pl: 'na',
		en: 'vs'
	},
	MATCHES_IMPOSSIBLE:
	{
		pl: 'Brak warunków do gry',
		en: 'Matches impossible'
	},
	IS_AFK:
	{
		pl: 'zgłasza nieobecność',
		en: 'is away from keyboard'
	},
	IS_NOT_AFK:
	{
		pl: 'powraca',
		en: 'returns'
	},
	AFKS:
	{
		pl: 'Nieobecni',
		en: 'AFKs'
	},
	NOTHING_HERE:
	{
		pl: 'Nic tu nie ma',
		en: 'Nothing here'
	},
	PLAYER_C:
	{
		pl: 'Gracz',
		en: 'Player',
		de: 'Spieler',
		tr: 'Oyuncu'
	},
	MESSAGE:
	{
		pl: 'wiadomość',
		en: 'message',
		de: 'Nachricht',
		tr: 'mesaj'
	},
	COLOR_IN_HEX:
	{
		pl: 'kolor w formacie 0xRRGGBB',
		en: 'color in 0xRRGGBB format',
		de: 'Farbe im 0xRRGGBB Format'
	},
	REASON:
	{
		pl: 'powód',
		en: 'reason',
		de: 'Grund',
		tr: 'neden'
	},
	HOST_STATS:
	{
		pl: 'Poprowadzone mecze o punkty',
		en: 'Matches for points refereed'
	},
	MATCHES:
	{
		pl: 'mecze',
		en: 'matches',
		de: 'Spiele',
		tr: 'maçlar'
	},
	GOALS:
	{
		pl: 'bramki',
		en: 'goals',
		de: 'Tore',
		tr: 'gol'
	},
	ASSISTS:
	{
		pl: 'asysty',
		en: 'assists',
		de: 'Assists',
		tr: 'asist'
	},
	OWN_GOALS:
	{
		pl: 'samobóje',
		en: 'own goals',
		de: 'Eigentore',
		tr: 'kendi kalesine gol'
	},
	CLEAN_SHEETS:
	{
		pl: 'czyste konta',
		en: 'clean sheets',
		de: 'ohne Gegentor'
	},
	WINS:
	{
		pl: 'zwycięstwa',
		en: 'wins',
		de: 'Siege',
		tr: 'galibiyet'
	},
	LOSES:
	{
		pl: 'porażki',
		en: 'loses',
		de: 'Niederlagen',
		tr: 'mağlubiyet'
	},
	AFTER_OVERTIME:
	{
		pl: 'po dogrywce',
		en: 'after overtime',
		de: 'nach Verlängerung',
		tr: 'uzatma süresi'
	},
	POINTS:
	{
		pl: 'punkty',
		en: 'points',
		de: 'Punkte',
		tr: 'skor'
	},
	AND:
	{
		pl: 'i',
		en: 'and',
		de: 'und',
		tr: 've'
	},
	NONE:
	{
		pl: 'brak',
		en: 'none',
		de: 'kein',
		tr: 'hiçbiri'
	},
	GOALKEEPERS:
	{
		pl: 'Bramkarze',
		en: 'Goalkeepers',
		de: 'Die Torhüter',
		tr: 'Kaleciler'
	},
	GOALKEEPER:
	{
		pl: 'Bramkarz',
		en: 'Goalkeeper',
		de: 'Der Torhüter',
		tr: 'Kaleci'
	},
	KEPT_CS_P:
	{
		pl: 'zachowali czyste konta',
		en: 'kept a clean sheet',
		de: 'haben kein Tor kassiert'
	},
	KEPT_CS:
	{
		pl: 'zachował czyste konto',
		en: 'kept a clean sheet',
		de: 'hat kein Tor kassiert'
	},
	STATS_VALID_IF_PLAYERS:
	{
		pl: 'Statystyki są liczone, kiedy w każdej drużynie jest co najmniej ^0 graczy',
		en: 'Stats are counted when there are at least ^0 players in each team',
		de: 'Die Statistiken werden gezählt, wenn mindestens ^0 Spieler in jedem Team sind'
	},
	STATS_VALID_IF_LIMITS:
	{
		pl: 'Statystyki są liczone, kiedy limity czasu i bramek mają wartości od ^0 do ^1',
		en: 'Stats are counted when the time and score limits have values from ^0 to ^1',
		de: 'Die Statistiken werden gezählt, wenn die Zeit- und Torgrenzen von ^0 bis ^1 sind'
	},
	MATCH_CANCELLED:
	{
		pl: 'Mecz ^0 trwał za krótko. Jego wyniki zostały anulowane',
		en: 'Match #^0 was too short, therefore it has been cancelled'
	},
	WL_CANCELLED:
	{
		pl: 'Przerwano przedwcześnie! Zwycięstwa i porażki nie zostały uwzględnione',
		en: 'Game stopped too early! Wins and loses does not count for it'
	},
	MIGHT_BE_THE_SAME_PERSON:
	{
		pl: 'mogą być tą samą osobą',
		en: 'might be the same person',
		de: 'könnten dieselbe Person sein'
	},
	LANGUAGE_CHANGE:
	{
		pl: 'Zmiana języka',
		en: 'Language change',
		de: 'Sprachwechsel',
		tr: 'Dil değişikliği'
	},
	UNKNOWN_LANGUAGE:
	{
		pl: 'Kod języka nieznany (^0). Domyślny jest polski', // niepotrzebne
		en: 'Language (^0) might not be supported. English is a fallback'
	},
	CODE:
	{
		pl: 'kod',
		en: 'code'
	},
	LEAVES:
	{
		pl: 'wychodzi',
		en: 'leaves',
		de: 'verlässt',
		tr: 'odadan çıkar'
	},
	AFK_KICK_INCOMING_IN_SECS:
	{
		pl: 'nie rusza się! Wykopanie za ^0 sekund',
		en: 'does not move! Will be kicked in ^0 seconds',
		de: 'bewegt sich nicht! Tritt in ^0 Sekunden'
	},
	KICK_AFK:
	{
		pl: 'Nieaktywny. Aby nie być wybierany, napisz !afk',
		en: 'AFK. Write !afk to avoid being moved to a team',
		de: 'Inaktiv. Tippe !afk ein, um nicht in ein Team versetzt zu werden'
	},
	DID_YOU_MEAN:
	{
		pl: 'Czy chodziło ci o',
		en: 'Did you mean',
		de: 'Meintest du',
		tr: 'Demek istediğin',
		ru: 'Возможно, вы имели в виду',
		lt: 'Galbūt jūs norėjote ieškoti'
	},
	PLAYERS_STARTING_WITH:
	{
		pl: 'Dostępni gracze na',
		en: 'Players beginning with',
		de: 'Spieler beginnend mit'
	},
	CLUBS_LIST:
	{
		pl: 'Lista dostępnych klubów do !kitsred/!kitsblue i ich skróty, wielkość liter nie ma znaczenia',
		en: 'List of clubs available to !kitsred/!kitsblue and their shortcuts, case insensitive'
	},
	CLUBS_STARTING_WITH:
	{
		pl: 'Dostępne kluby na',
		en: 'Clubs beginning with',
		de: 'Vereine beginnend mit'
	},
	MAPS_LIST:
	{
		pl: 'Lista dostępnych map do !load, można wpisać część nazwy mapy',
		en: 'List of clubs available to !load, case insensitive, part of the name works as well'
	},
	NO_CLUB_STARTING_WITH:
	{
		pl: 'Nie ma klubu na',
		en: 'No club begins with',
		de: 'Kein Verein beginnt mit'
	},
	MAPS_STARTING_WITH:
	{
		pl: 'Dostępne mapy na',
		en: 'Maps beginning with',
		de: 'Stadien beginnend mit'
	},
	NO_MAP_STARTING_WITH:
	{
		pl: 'Nie ma mapy na',
		en: 'No map begins with',
		de: 'Kein Stadion beginnt mit'
	},
	CHECK_C:
	{
		pl: 'Sprawdź',
		en: 'Check',
		de: 'Prüf'
	},
	_8BALL_NOT_SUPPORTED:
	{
		pl: 'Bilard nie jest wspierany. Statystyki wyłączone',
		en: 'Billiards are not supported. Stats disabled',
		de: 'Billard wird nicht unterstützt. Statistiken deaktiviert'
	},
	HINT_SPACEWRESTLING:
	{
		pl: 'WSKAZÓWKA: Jeżeli wypadniesz poza boisko, możesz wrócić tylko przez rury za bramką',
		en: 'HINT: If you leave the field, the only way back leads through the pipe maze behind the goal'
	},
	PAUSING_IS_DISABLED:
	{
		pl: 'Zatrzymywanie gry jest wyłączone',
		en: 'Pausing is disabled'
	},
	SPEC_CANT_PAUSE:
	{
		pl: 'Ławka nie może zatrzymywać gry',
		en: 'Spectators cannot pause the game'
	},
	MUTED:
	{
		pl: 'Wyciszono',
		en: 'Muted'
	},
	UNMUTED:
	{
		pl: 'Odciszono',
		en: 'Unmuted'
	},
	ALREADY_MUTED:
	{
		pl: 'Już wcześniej wyciszono',
		en: 'Already muted'
	},
	ALREADY_UNMUTED:
	{
		pl: 'Nie wyciszono wcześniej',
		en: 'Already unmuted'
	},
	GENDER_NOT_FOUND:
	{
		pl: 'Nieznana płeć: ^0. Domyślne ustawienie to m.',
		en: 'Unknown gender: ^0. Default is m.'
	},
	KICKED_BY:
	{
		pl: 'Wykopanie przez',
		en: 'Kicked by'
	},
	PAUSE:
	{
		pl: 'pauza',
		en: 'pause'
	},
	CLEAR_BANS:
	{
		pl: 'czyść bany',
		en: 'clear bans'
	},
	KICK_SB:
	{
		pl: 'wykop',
		en: 'kick'
	},
	NO_DISCORD:
	{
		pl: 'Nie ma Discorda.',
		en: 'There is no Discord.'
	},
	NO_LOGIN:
	{
		pl: 'Nie ma logowania.',
		en: 'There is no login.'
	},
	NO_REGISTER:
	{
		pl: 'Nie ma rejestracji.',
		en: 'There is no register.'
	},
	ADMIN_COMMANDS:
	{
		pl: 'Komendy dla adminów',
		en: 'Admin commands'
	},
	HELP_HELP:
	{
		pl: 'Wyświetla szczegóły podanej komendy.',
		en: 'Displays the details of the specified command.'
	},
	HELP_POSS:
	{
		pl: 'Wyświetla obecne posiadanie piłki w procentach. Jezeli mecz nie trwa, wyświetla posiadanie piłki w ostatnim meczu.',
		en: 'Displays current ball possession as a percentage. If the match is not in progress, it displays ball possession in the last match'
	},
	HELP_WHOSCORED:
	{
		pl: 'Wyświetla obecnych strzelców (i asystentów). Jezeli mecz nie trwa, wyświetla strzelców w ostatnim meczu. Lista jest widoczna na powtórkach.',
		en: 'Displays current goal scorers (and assists). If the match is not in progress, it displays the list from the last match. The list is visible on replays.'
	},
	HELP_ADMINHELP:
	{
		pl: 'Wyświetla listę komend, z których mogą korzystać administratorzy.',
		en: 'Displays commands that only administrators can use.'
	},
	HELP_BEST_1:
	{
		pl: 'Wyświetla graczy mających najwięcej punktów. Punktacja:',
		en: 'Displays the players with the most points. Scoring:'
	},
	HELP_BEST_2:
	{
		pl: 'bramka: 3 pkt, asysta: 1 pkt, czyste konto: 1 pkt, zwycięstwo: 3 pkt (po dogrywce: 2 pkt), porażka: 0 pkt (po dogrywce: 1 pkt), samobój: -2 pkt.',
		en: 'goal: 3 pts, assist: 1 pt, clean sheet: 1 pt, win: 3 pt (after overtime: 2 pts), lose: 0 pts (after overtime: 1 pt), own goal: -2 pts.'
	},
	HELP_INFO_1:
	{
		pl: 'Wyświetla informacje o pokoju. Zalecana wielkość drużyn zależy od ilości aktywnych graczy:',
		en: 'Displays the room status. The recommended team size depends on the number of active players:'
	},
	HELP_INFO_2:
	{
		pl: '2-3 - 1na1 ◽ 4-6 - 2na2 ◽ 7-8 - 3na3 ◽ 9 lub więcej - 4na4.',
		en: '2-3 - 1vs1 ◽ 4-6 - 2vs2 ◽ 7-8 - 3vs3 ◽ 9 or above - 4vs4.'
	},
	HELP_LANG:
	{
		pl: 'Zmienia język komunikatów na ten, który wskazuje kod.',
		en: 'Changes announcements language to the one indicated by the lang code.'
	},
	HELP_GENDER:
	{
		pl: 'Ustala płeć gracza (m lub k), do których mają być dostosowane komunikaty. Domyślne ustawienie to m. Kopernik była kobietą.',
		en: "Sets player's gender (m or f). Default is m. Useful for Polish announcements only."
	},
	HELP_DEOP:
	{
		pl: 'Zabiera admina.',
		en: 'Removes admin.'
	},
	HELP_P:
	{
		pl: 'Zatrzymuje/Wznawia grę. Tylko gracze w drużynach mogą tego używać.',
		en: 'Pauses/Resumes the game. You have to be in a team to use it.'
	},
	HELP_BB:
	{
		pl: 'Wyjście ewakuacyjne',
		en: 'Emergency exit'
	},
	HELP_KLUBY_1:
	{
		pl: 'Wyświetla listę klubów z polskich lig dostępnych jako argumenty komendy !kitsred lub !kitsblue. Stan na sezon 2019/2020.',
		en: 'Lists all of the Polish league clubs available as arguments for the !kitsred or !kitsblue command as of the 2019/2020 season.'
	},
	HELP_KLUBY_2:
	{
		pl: 'Może być wpisany fragment nazwy lub ich 3-literowy skrót, wielkość liter i polskie znaki nie mają znaczenia.',
		en: 'Do not mind the diacritics or the letter case. The club name fragment or its 3-letter abbreviation are acceptable.'
	},
	HELP_AFK:
	{
		pl: 'Pozwala graczowi na wchodzenie lub wychodzenie ze stanu nieobecności. Nieobecni nie mogą zostać przesunięci do drużyn.',
		en: 'Marks the player as (in)active. AFK players cannot be moved to team.'
	},
	HELP_AFKS:
	{
		pl: 'Wyświetla listę nieobecnych. Nieobecni nie mogą zostać przesunięci do drużyn.',
		en: 'Lists inactive (AFK) players. AFK players cannot be moved to team.'
	},
	HELP_MAPY_1:
	{
		pl: 'Wyświetla listę map dostępnych jako argumenty komendy !load.',
		en: 'Lists all maps dostępnych available as arguments for the !load command.'
	},
	HELP_MAPY_2:
	{
		pl: 'Może być wpisany fragment nazwy mapy, wielkość liter nie ma znaczenia.',
		en: 'The map name fragment is acceptable. Names are case-insensitive'
	},
	HELP_STATS_1:
	{
		pl: 'Wyświetla statystyki podanego gracza lub twoje, jeżeli podany gracz nie istnieje.',
		en: 'Displays the given player stats or yours if the given player does not exist.'
	},
	HELP_STATS_2:
	{
		pl: 'Są przypisane do nazwy gracza i zostają, gdy gracz wyjdzie. Statystyki są liczone, kiedy przy rozpoczęciu gry w każdej drużynie jest co najmniej 3 graczy.',
		en: "They are assigned to the player's name and remain after the player leaves. Stats are counted when there are at least 3 players in each team at the start of the game."
	},
	HELP_KITSRED:
	{
		pl: 'Ustawia kolory czerwonych na stroje domowe wybranego polskiego klubu. Aby zobaczyć dostępne nazwy, wpisz !kluby. Wielkość liter i polskie znaki są ignorowane.',
		en: 'Sets the red team colors to the Polish club home kits of your choice. To see available names, write !kluby. Diacritics and letter cases are ignored.'
	},
	HELP_KITSBLUE:
	{
		pl: 'Ustawia kolory niebieskich na stroje domowe wybranego polskiego klubu. Aby zobaczyć dostępne nazwy, wpisz !kluby. Wielkość liter i polskie znaki są ignorowane.',
		en: 'Sets the blue team colors to the Polish club home kits of your choice. To see available names, write !kluby. Diacritics and letter cases are ignored.'
	},
	HELP_PM:
	{
		pl: 'Wysyła wiadomość prywatną do wybranego gracza.',
		en: 'Sends a private message to the target player.'
	},
	HELP_CB:
	{
		pl: 'Czyści wszystkie bany w pokoju.',
		en: 'Clears all bans in the room.'
	},
	HELP_SWAP:
	{
		pl: 'Kiedy gra jest zatrzymana, zamienia obie drużyny miejscami.',
		en: 'Swaps both teams when the game is stopped.'
	},
	HELP_AUTOPOSS:
	{
		pl: 'Wł./Wył. wyświetlanie posiadania piłki co 5 minut trwania meczu.',
		en: 'Enables/Disables displaying ball possession every 5 minutes of the match duration.'
	},
	HELP_RZUTSĘDZIOWSKI:
	{
		pl: 'Teleportuje piłkę na środek boiska.',
		en: 'Teleports the ball to the middle of the pitch.'
	},
	HELP_REF:
	{
		pl: 'Wł./Wył. sędziego Real Soccer.',
		en: 'Enables/Disables Real Soccer referee.'
	},
	HELP_TRED:
	{
		pl: 'Ustawia nazwę dla czerwonych. Przydatne na mapach Real Soccer z sędzią przywołanym komendą !ref.',
		en: 'Names the red team. Most useful on Real Soccer with referee summoned with !ref.'
	},
	HELP_TBLUE:
	{
		pl: 'Ustawia nazwę dla niebieskich. Przydatne na mapach Real Soccer z sędzią przywołanym komendą !ref.',
		en: 'Names the blue team. Most useful on Real Soccer with referee summoned with !ref.'
	},
	HELP_LOAD:
	{
		pl: 'Ładuje niestandardową mapę. Aby zobaczyć dostępne nazwy map, wpisz !mapy.',
		en: 'Loads a custom map. To see all available map names, write !mapy.'
	},
	HELP_E:
	{
		pl: 'Pilny kolorowy komunikat od administratora zwracający uwagę wszystkich w pokoju.',
		en: "An urgent colourful announcement from the administrator which draws everyone's attention."
	},
	HELP_K:
	{
		pl: 'Gospodarz wykopuje gracza z ID podanym jako argument. Dalej można podać powód. Powód zawiera nazwę gracza, który użył tej komendy',
		en: 'The host kicks the player with the ID given as an argument. You can give a reason further. The reason includes the name of the player who used this command.'
	},
	NO_GAME_ACTIVITY_NEW_ADMIN:
	{
		pl: 'Nastąpił zastój. Nowy admin za ^0 sekund',
		en: 'Room died. New admin in ^0 seconds'
	},
	EMERGENCY_ADMIN_GIVEN:
	{
		pl: 'Nowy admin przyznany',
		en: 'A new admin appeared'
	},
	NEVER_MIND:
	{
		pl: 'Nieważne',
		en: 'Never mind'
	}
};

String.prototype.format = function(args)
{
  str = this;
  for (no in args)
	{
    str = str.replace('^' + no, args[no]);
  }
  return str;
}

function translate(object, player)
{ // tłumaczenie na język gracza lub angielski lub polski
	return object[playerLang.get(player.id)] || object.en || object.pl;
}

/*
    ****************************** Wyciąganie graczy ******************************
*/
function getPlayerByName(name)
{
	return players.find((p) => p.name === name);
}
function getPlayerByAuth(auth)
{
	return room.getPlayer(authPlayers[auth].id);
}
function getPlayersByTeam(team)
{
	return players.filter((p) => p.team === team);
}
function getPlayersByAdmin(admin)
{
	return players.filter((p) => p.admin === admin);
}
function getPlayersByConn(conn)
{
	let connArr = [];
	Object.keys(authConns).forEach(e =>
	{
		if (authConns[e].conn === conn && room.getPlayer(parseInt(e)) != null)
		{
			connArr.push(room.getPlayer(parseInt(e)));
		}
	});
	return connArr;
}
function getIdByPlayerName(name)
{
	if (getPlayerByName(name) == null)
		return null;
	else
		return players.find((p) => p.name === name).id;
}

/*
    ****************************** Funkcje ******************************
*/
function randInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saveFile(data, filename)
{ // Zapis danych do pliku
  let blob = new Blob([data], {type: "text/plain;charset=utf-8"});
	saveAs(blob, filename);
}

let replays = new Array();
let isRecording = false;
let replayNumber = 0;
function saveReplay(replayNumber)
{ // Zapis powtórki
	saveFile(replays[replayNumber], 'Powtórka' + replayNumber + '.hbr2');
}

function backupServerData()
{
	let data = {};
	data.scores = stats;
	data.matchStats = matchStats;
	data.bijacze = bijacze;
	data.bluzniercy = bluzniercy;
	data.muted = muted;
	data.matches = matchCount;

	let d = new Date();
	let jsonData = JSON.stringify(data);
	saveFile(jsonData, 'SedziaKalosz_' + d.getFullYear() + String(d.getMonth()+1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + '.txt');
}

function restoreServerData(data)
{ // parametr to {}
	//let data = JSON.parse(dataContent); // wywala błędy z '\\'
	if (data.scores)
		stats = data.scores;
	if (data.matchStats)
		matchStats = data.matchStats;
	if (data.bijacze)
		bijacze = data.bijacze;
	if (data.bluzniercy)
		bluzniercy = data.bluzniercy;
	if (data.muted)
		muted = data.muted;
	if (data.matches)
		matchCount = data.matches;
}

function startRecording()
{
	room.startRecording();
	isRecording = true;
}

function stopRecording()
{
	replays[replayNumber] = room.stopRecording();
	isRecording = false;
	replayNumber++;
}

function reactToBallRadiusChange()
{
	ballRadius = room.getDiscProperties(0).radius;
	isBackFurtherNeededDistance = ballRadius + 15 + 0.01;
	outLineY = stadiumWidth - (ballRadius / 2) + 6;
	stadiumWidth = baseStadiumWidth + (ballRadius / 2) + 6;
	stadiumHeight = baseStadiumHeight + (ballRadius / 2) + 6;
}

function updatePlayerList() // onPlayerJoin, onPlayerLeave, onPlayerTeamChange
{ // wywołanie przy wchodzeniu/wychodzeniu
    players = room.getPlayerList().filter(player => player.id !== 0); // players bez bota
	population = players.length;
}

function updateActiveList() // onPlayerJoin, onPlayerLeave, afkFun
{ // wywołanie przy wchodzeniu/wychodzeniu i !afk
	activePop = population - afks.length; // players - nieaktywni

	if (activePop < 2)
		pvp = 0;
	else if (activePop >= 2 && activePop < 4)
		pvp = 1;
	else if (activePop >= 4 && activePop < 7)
		pvp = 2;
	else if (activePop >= 7 && activePop < 9)
		pvp = 3;
	else if (activePop >= 9)
		pvp = 4;
}

let kawalkiPrzeklenstw = ['HUJ'
, 'JEBA', 'JEBC', 'JEBE', 'JEBI', 'JEBN', 'JEBY', 'AJEB', 'OJEB', 'UJEB', 'WJEB', 'YJEB', 'ZJEB' // Jeb
, 'PIZD'
, 'QRW', 'KURW'
, 'PIERDOL', 'PIERDAL'];
let wyjatki = ['KURWATUR', 'KURWIK', 'KURWINO', 'SKURWOL', 'SKURWIWIJ' // kurwatura
, 'CHUJEW', 'RAHUJ', 'RACHUJ', 'ECHUJ', 'UCHUJ' // abstrachuje, podśmiechujki, podsłuchuj
, 'PIZDU'
, 'ZAJEBIS'
, 'AJEBA', 'AJEBI', 'OJEBA', 'ZJEBA']; // nie ma podwójnego karania

function upperTrim(string)
{ // do nazw drużyn i map
	string = string.toUpperCase().trim(); // do WIELKICH LITER i usuwanie spacji na początku i końcu
	return string;
}

function oczysc(message)
{ // do wykrywania wulgaryzmów (niewykorzystywana)
	message = message.toUpperCase(); // do WIELKICH LITER
  //message = message.replace(/\s/g, ''); // usuwanie spacji (ale wtedy 'rosół z KUR Wielu' to wulgaryzm)
  message = message.replace(/\.|\,|\;|\'|\/|\-|\_|\`|\|/g, ''); // usuwanie znaków int.
	return message;
}

let defaultDiacriticsRemovalMap=[{base:'A',letters:'AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ'},{base:'AA',letters:'Ꜳ'},{base:'AE',letters:'ÆǼǢ'},{base:'AO',letters:'Ꜵ'},{base:'AU',letters:'Ꜷ'},{base:'AV',letters:'ꜸꜺ'},{base:'AY',letters:'Ꜽ'},{base:'B',letters:'BⒷＢḂḄḆɃƂƁ'},{base:'C',letters:'CⒸＣĆĈĊČÇḈƇȻꜾ'},{base:'D',letters:'DⒹＤḊĎḌḐḒḎĐƋƊƉꝹÐ'},{base:'DZ',letters:'ǱǄ'},{base:'Dz',letters:'ǲǅ'},{base:'E',letters:'EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ'},{base:'F',letters:'FⒻＦḞƑꝻ'},{base:'G',letters:'GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ'},{base:'H',letters:'HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ'},{base:'I',letters:'IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ'},{base:'J',letters:'JⒿＪĴɈ'},{base:'K',letters:'KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ'},{base:'L',letters:'LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ'},{base:'LJ',letters:'Ǉ'},{base:'Lj',letters:'ǈ'},{base:'M',letters:'MⓂＭḾṀṂⱮƜ'},{base:'N',letters:'NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ'},{base:'NJ',letters:'Ǌ'},{base:'Nj',letters:'ǋ'},{base:'O',letters:'OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ'},{base:'OI',letters:'Ƣ'},{base:'OO',letters:'Ꝏ'},{base:'OU',letters:'Ȣ'},{base:'OE',letters:'Œ'},{base:'oe',letters:'œ'},{base:'P',letters:'PⓅＰṔṖƤⱣꝐꝒꝔ'},{base:'Q',letters:'QⓆＱꝖꝘɊ'},{base:'R',letters:'RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ'},{base:'S',letters:'SⓈＳŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ'},{base:'SS',letters:'ẞ'},{base:'T',letters:'TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ'},{base:'TZ',letters:'Ꜩ'},{base:'U',letters:'UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ'},{base:'V',letters:'VⓋＶṼṾƲꝞɅ'},{base:'VY',letters:'Ꝡ'},{base:'W',letters:'WⓌＷẀẂŴẆẄẈⱲ'},{base:'X',letters:'XⓍＸẊẌ'},{base:'Y',letters:'YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ'},{base:'Z',letters:'ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ'},{base:'a',letters:'aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ'},{base:'aa',letters:'ꜳ'},{base:'ae',letters:'æǽǣ'},{base:'ao',letters:'ꜵ'},{base:'au',letters:'ꜷ'},{base:'av',letters:'ꜹꜻ'},{base:'ay',letters:'ꜽ'},{base:'b',letters:'bⓑｂḃḅḇƀƃɓ'},{base:'c',letters:'cⓒｃćĉċčçḉƈȼꜿↄ'},{base:'d',letters:'dⓓｄḋďḍḑḓḏđƌɖɗꝺ'},{base:'dz',letters:'ǳǆ'},{base:'e',letters:'eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ'},{base:'f',letters:'fⓕｆḟƒꝼ'},{base:'g',letters:'gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ'},{base:'h',letters:'hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ'},{base:'hv',letters:'ƕ'},{base:'i',letters:'iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı'},{base:'j',letters:'jⓙｊĵǰɉ'},{base:'k',letters:'kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ'},{base:'l',letters:'lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ'},{base:'lj',letters:'ǉ'},{base:'m',letters:'mⓜｍḿṁṃɱɯ'},{base:'n',letters:'nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ'},{base:'nj',letters:'ǌ'},{base:'o',letters:'oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ'},{base:'oi',letters:'ƣ'},{base:'ou',letters:'ȣ'},{base:'oo',letters:'ꝏ'},{base:'p',letters:'pⓟｐṕṗƥᵽꝑꝓꝕ'},{base:'q',letters:'qⓠｑɋꝗꝙ'},{base:'r',letters:'rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ'},{base:'s',letters:'sⓢｓśṥŝṡšṧṣṩșşȿꞩꞅẛ'},{base:'ss',letters:'ß'},{base:'t',letters:'tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ'},{base:'tz',letters:'ꜩ'},{base:'u',letters:'uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ'},{base:'v',letters:'vⓥｖṽṿʋꝟʌ'},{base:'vy',letters:'ꝡ'},{base:'w',letters:'wⓦｗẁẃŵẇẅẘẉⱳ'},{base:'x',letters:'xⓧｘẋẍ'},{base:'y',letters:'yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ'},{base:'z',letters:'zⓩｚźẑżžẓẕƶȥɀⱬꝣ'}];

let diacriticsMap = {};
for (let i = 0; i < defaultDiacriticsRemovalMap.length; i++)
{
  let letters = defaultDiacriticsRemovalMap[i].letters;
  for (let j = 0; j < letters.length; j++)
	{
		diacriticsMap[letters[j]] = defaultDiacriticsRemovalMap[i].base;
  }
}

function removeDiacritics(str)
{
  return str.replace(/[^\u0000-\u007E]/g, function(a)
	{
    return diacriticsMap[a] || a;
  });
}

function autocomplete(message, array)
{
	let resultArray = [];
	message = message.trim();
	for (let i = 0; i < array.length; i++)
	{ // dla każdego elementu w tablicy nazw
		if (removeDiacritics(array[i].substr(0, message.length)).toUpperCase() == removeDiacritics(message).toUpperCase())
		{ // jeżeli nazwa zaczyna się na te same litery, co wiadomość (ignorując wielkość liter i znaki diakrytyczne)
			result = '';
			// WIELKIE pasujące litery
			//result += array[i].substr(0, message.length).toUpperCase();
			// dodać resztę elementu
			//result += array[i].substr(message.length);
			result += array[i];
			resultArray[resultArray.length] = result;
		}
	}
	return resultArray;
}

function liczbaWulgaryzmow(message)
{
	let liczbaWulg = 0;
	kawalkiPrzeklenstw.forEach(function(kawalek)
	{
		// jeżeli wiadomość zawiera kawałek przekleństwa
		if (removeDiacritics(oczysc(message)).includes(kawalek))
		{
			ilosc = (removeDiacritics(oczysc(message)).match(new RegExp(kawalek, "g")) || []).length;
			//console.log(kawalek + ':💩 ' + ilosc);
			liczbaWulg += ilosc;
			wyjatki.forEach(function(wyj)
			{
				if (removeDiacritics(oczysc(message)).includes(wyj) && wyj.includes(kawalek))
				{ // jeżeli wiadomość zawiera wyjątek i wyjątek zawiera kawałek przekleństwa
					ilosc = (removeDiacritics(oczysc(message)).match(new RegExp(wyj, "g")) || []).length;
					//console.log(wyj + ':✔ ' + ilosc);
					liczbaWulg -= ilosc;
					//console.log('Razem: ' + liczbaWulg);
				}
			});
		}
	});
	return liczbaWulg;
}

function kickWrongPlayer(player) // onPlayerJoin
{ // wywoływana przy wchodzeniu
	// Nieodpowiednia nazwa
	if (liczbaWulgaryzmow(player.name) > 1)
	{
		room.kickPlayer(player.id, '🛑 ' + translate(locStr.KICK_TOO_MANY_SWEAR, player), false);
		return true;
	}

	// Fałszywy sędzia
	if (player.name.startsWith('🗿') && !hostHidden)
	{
		room.kickPlayer(player.id, '🛑 ' + translate(locStr.KICK_NICK_CANNOT_START_WITH, player) + ' 🗿', false);
		return true;
	}

	// /
	if (player.name.startsWith('/'))
	{
		room.kickPlayer(player.id, '🛑 ' + translate(locStr.KICK_NICK_CANNOT_START_WITH, player) + ' /', false);
		return true;
	}

	// Duplikat (bez uwzgl. wielkości liter)
	for (i = 0; i < population; i++)
	{
		if (upperTrim(player.name) == upperTrim(players[i].name))
		{
			let prevAuth = authPlayers[player.auth]; // poprzedni gracz o tym samym auth
			if (prevAuth != null)
			{ // jeżeli wchodzi drugi gracz o tym samym auth
				if (room.getPlayer(prevAuth.id) != null)
					// jeżeli poprzedni gracz jest obecny
					return false; // pozwolenie na wymianę gracza na nowego
			}
			else
			{
				room.kickPlayer(player.id, '🛑 ' + translate(locStr.KICK_NICK_TAKEN, player), false);
				return true;
			}
		}
	}

	// Spacje na początku i końcu
	if (player.name.match(/^\s+|\s+$/g) != null)
	{
		room.kickPlayer(player.id, '🛑 ' + translate(locStr.KICK_NICK_TRAILING_SPACES, player), false);
		return true;
	}

	// Podwójne spacje
	if (player.name.match(/\s\s+/g) != null)
	{
		room.kickPlayer(player.id, '🛑 ' + translate(locStr.KICK_NICK_HAS_TOO_MANY_SPACES, player), false);
		return true;
	}

	return false;
}

// Jeżeli nie ma adminów, daj admina pozostałemu graczowi
function updateAdmins() // onPlayerJoin, onPlayerLeave
{
	if (population === 0)
		return false; // Nikogo nie ma
	if (players.find((p) => p.admin) != null) // !=
		return false; // Jest admin, nic nie rób
	room.setPlayerAdmin(players[0].id, true); // Pierwszy nie-admin na liście dostaje admina
	return true;
}

function initPlayerStats(player) // onPlayerJoin
{
  let name = upperTrim(player.name);
	if (!(name in stats))
		stats[name] = {M:0, G:0, A:0, OG:0, CS:0, W:0, L:0, DW:0, DL:0}; // mecze, bramki, asysty, sam., CK, Z, P, ZD, PD
}

function initMatchStats(playerName) // onPlayerJoin
{
	if (!(playerName in matchStats))
		matchStats[playerName] = {M:0, G:0, A:0, OG:0}; // mecze, bramki, asysty, sam.
}

function initBijacze(player) // onPlayerJoin
{
	let name = upperTrim(player.name);
	if (!(name in bijacze))
		bijacze[name] = 0;
}

function setPlayerLanguage(player, lang)
{
	if (lang == null)
		lang = 'pl';
	playerLang.set(player.id, lang);
}

function setPlayerGender(player, gender)
{
	if (gender == null)
		gender = 'M';
	playerGender.set(player.id, gender);
}

function initBluzniercy(player) // onPlayerJoin
{
	let name = upperTrim(player.name);
	if (!(name in bluzniercy))
		bluzniercy[name] = 0;
}

function initMuted(player) // onPlayerJoin
{
	let name = upperTrim(player.name);
	if (!(name in muted))
		muted[name] = 0;
}

function initAuthConn(player) // onPlayerJoin
{
	if (!(player.id in authConns))
		authConns[player.id] = {auth: player.auth, conn: player.conn};
}

function setAuthPlayers(player, update)
{
	if (!(player.auth in authPlayers) || update)
		// jeżeli to nowy auth lub należy zaktualizować
		authPlayers[player.auth] = {player: player, id: player.id, name: player.name
		, conn: player.conn, ip: player.ip};
}

// Ikony drużyn
function teamIcon(team)
{ // uwaga: mogą być u niektórych wyświetlane jako kwadraty lub czarno-białe, nie polegać wyłącznie na nich
	if (team === Team.RED)
		return '🔴'; // czerwony
	else if (team === Team.BLUE)
		return '🔵'; // niebieski
	else return '⬜'; // ławka
}

function slap(playerName)
{ // @nazwa_gracza
	return '@' + playerName.split(' ').join('_');
}

function isLetter(c)
{
    return c.toLowerCase() != c.toUpperCase();
}

// DEKLINACJA NAZWISK
var vowels = 'AEIOUY';
function isVowel(char)
{
	if (char.length === 1)
	{
		return vowels.indexOf(char) >= 0 ? true : false;
	}
}

function vowelsCount(wyraz)
{
	let found = wyraz.match(/[AĄEĘIOÓUY]/gi);
	let count = found === null ? 0 : found.length;
	let groups = ['IA', 'IE', 'II', 'IO', 'IU'];
	groups.forEach((e)=>
	{
		if (wyraz.includes(e))
			count--;
	});
    return count;
}

function dopelniacz(wyraz)
{
	wyraz = wyraz.trim();
	let len = wyraz.length;
	wyrazU = wyraz.toUpperCase();

	if (vowelsCount(wyrazU) < 2 && isVowel(wyrazU[len-1])) // Jednosylabowe nazwiska zakończone samogłoską są nieodmienne.
		return wyraz;

	if (!isLetter(wyraz[len-1])) // Musi być litera na końcu
		return wyraz;

	// A
	if (wyrazU.endsWith('A')) // -A
	{
		if (vowelsCount(wyrazU) < 2 || ['O'].includes(wyrazU[len-2])) // Wsza, DebOA
			return wyraz; // nie odmieniamy
		else if (wyrazU.endsWith('JA')) // -JA
		{
			if (['C','S','Z'].includes(wyrazU[len-3])) // PeZJA - PezjI
				wyraz = wyraz(0, len-1) + 'i';
			else // PeJA - PeI
				wyraz = wyraz.substring(0, len-2) + 'i';
		}
		else if (wyrazU.endsWith('YA')) // GaYA - GaI
			wyraz = wyraz.substring(0, len-2) + 'i';
		else if (wyrazU.endsWith('IA')) // MarIA - MarII
			wyraz = wyraz.substring(0, len-1) + 'i';
		else if (['A','E','G','K','L','Q','U'].includes(wyrazU[len-2])) // reliGA - religI
			wyraz = wyraz.substring(0, len-1) + 'i';
		else // SzukałA - SzukałY
			wyraz = wyraz.substring(0, len-1) + 'y';
	}
	// E
	else if (wyrazU.endsWith('E')) // -E
	{
		wyraz += 'go'; // JoE = JoeGO
	}
	// I
	else if (wyrazU.endsWith('I')) // -I
	{
		if (wyrazU[len-2] === 'I') // Więcej niż 1 i na końcu - WolskII - WolskiEGO
			wyraz = wyraz.substring(0, len-1) + 'ego';
		else // PolskI - PolskiEGO
			wyraz += 'ego';
	}
	// O
	else if (wyrazU.endsWith('O')) // -O
	{
		if (['A','E','O','U'].includes(wyrazU[len-2])) // FalcAO
			return wyraz;
		else if (['G','K','Q'].includes(wyrazU[len-2])) // SanoGO - SanoGI
			wyraz = wyraz.substring(0, len-1) + 'i';
		else if (['I','J','L','Y']) // MarIO - MariA
			wyraz = wyraz.substring(0, len-1) + 'a';
		else // TołpiłO - TołopiłY
			wyraz = wyraz.substring(0, len-1) + 'y';
	}
	// U
	else if (wyrazU.endsWith('U')) // -U
	{
		if (wyrazU[len-2] === 'A') // PorAU = PorauA
			wyraz += 'a';
		else if (wyrazU[len-2] === 'E') // PorEU - PoreuGO
			wyraz += 'go';
		else // nie odmieniamy wygłosowego -u
			return wyraz;
	}
	// Y
	else if (wyrazU.endsWith('Y')) // -Y
	{
		if (['A','E','O'].includes((wyrazU[len-2]))) // FaradAY - FaradayA
			wyraz += 'a';
		else // RakoczY - RakoczEGO
			wyraz = wyraz.substring(0, len-1) + 'ego';
	}
	else if (wyrazU.endsWith('EC') && vowelsCount(wyrazU) > 1) // 1-sylabowe: Pec - PecA
	{
		if (wyrazU.substring(len-4, len-2) === 'CI') // CzeCIEC - CzeĆCA
			wyraz = wyraz.substring(0, len-4) + 'ćca';
		else if (wyrazU.substring(len-4, len-2) === 'NI') // CzeNIEC - CzeŃCA
			wyraz = wyraz.substring(0, len-4) + 'ńca';
		else if (wyrazU.substring(len-4, len-2) === 'SI') // CzeSIEC - CzeŚCA
			wyraz = wyraz.substring(0, len-4) + 'śca';
		else if (wyrazU.substring(len-4, len-2) === 'ZI') // CzeZIEC - CzeŹCA
			wyraz = wyraz.substring(0, len-4) + 'źca';
		else if (wyrazU.substring(len-4, len-2) === 'RZ') // MaRZEC - MaRCA
			wyraz = wyraz.substring(0, len-4) + 'rca';
		else if (wyrazU.substring(len-3, len-2) === 'I') // CzepIEC - CzepCA
			wyraz = wyraz.substring(0, len-3) + 'ca';
		else // DerEC - DerCA
			wyraz = wyraz.substring(0, len-2) + 'ca';
	}
	else if (wyrazU.endsWith('EK') && vowelsCount(wyrazU) > 1) // 1-sylabowe: Pek - PekA
	{
		if (wyrazU.substring(len-4, len-2) === 'CI') // MaCIEK - MaĆKA
			wyraz = wyraz.substring(0, len-4) + 'ćka';
		else if (wyrazU.substring(len-4, len-2) === 'NI') // MaNIEK - MaŃKA
			wyraz = wyraz.substring(0, len-4) + 'ńka';
		else if (wyrazU.substring(len-4, len-2) === 'SI') // MaSIEK - MaŚKA
			wyraz = wyraz.substring(0, len-4) + 'śka';
		else if (wyrazU.substring(len-4, len-2) === 'ZI') // MaZIEK - MaŹKA
			wyraz = wyraz.substring(0, len-4) + 'źka';
		else // NeczEK - NeczKA
			wyraz = wyraz.substring(0, len-2) + 'ka';
	}
	else if (wyrazU.endsWith('Ć')) // ŚmieĆ - ŚmieCIA
		wyraz = wyraz.substring(0, len-1) + 'cia';
	else if (wyrazU.endsWith('Ń')) // ŚmieŃ - ŚmieNIA
		wyraz = wyraz.substring(0, len-1) + 'nia';
	else if (wyrazU.endsWith('Ś')) // ŚmieŚ - ŚmieSIA
		wyraz = wyraz.substring(0, len-1) + 'sia';
	else if (wyrazU.endsWith('Ź')) // ŚmieŹ - ŚmieZIA
		wyraz = wyraz.substring(0, len-1) + 'zia';
	else if (wyrazU.endsWith('X')) // WreX - WreKSA
		wyraz = wyraz.substring(0, len-1) + 'ksa';
	else if (!isVowel(wyrazU.substring(len-1))) // nie kończy się na samogłoskę
	{
		if (wyrazU[len-2] === 'Ó') // JamrÓz - JamrOzA
			wyraz = wyraz.substring(0, len-2) + 'o' + wyraz.substring(len-1) + 'a';
		else // Kozioł - KoziołA
			wyraz += 'a';
	}

	return wyraz;
}

function dopelniaczNazwy(nazwa)
{
	let nazwaD = '';
	let czlony = nazwa.split(' ');
	czlony.forEach((czlon)=>
	{
		let czlonU = czlon.toUpperCase();
		let nieodmienialne = ['VAN', 'VON', 'VOM', 'DOS']; // Ulricha von Jungingena
		if (nieodmienialne.includes(czlonU) || czlon.length < 3)
			nazwaD += ' ' + czlon;
		else
			nazwaD += ' ' + dopelniacz(czlon);
	});
	return nazwaD.trim();
}

function biernik(wyraz)
{
	wyraz = wyraz.trim();
	let len = wyraz.length;
	wyrazU = wyraz.toUpperCase();

	if (vowelsCount(wyrazU) < 2 && isVowel(wyrazU[len-1])) // Jednosylabowe nazwiska zakończone samogłoską są nieodmienne.
		return wyraz;

	if (!isLetter(wyraz[len-1])) // Musi być litera na końcu
		return wyraz;
	if (['Ą', 'Ę'].includes(wyraz[len-1])) // Nietypowych końcówek nie odmieniamy
		return wyraz;

	// A
	if (wyrazU.endsWith('A')) // -A
	{
		if (vowelsCount(wyrazU) < 2 || ['O'].includes(wyrazU[len-2])) // Wsza, DebOA
			return wyraz; // nie odmieniamy
		else
			wyraz = wyraz.substring(0, len-1) + 'ę'; // SzukałA - SzukałĘ
	}
	// E
	else if (wyrazU.endsWith('E')) // -E
	{
		wyraz += 'go'; // JoE = JoeGO
	}
	else if (wyrazU.endsWith('I')) // -I
	{
		if (wyrazU[len-2] === 'I') // Więcej niż 1 i na końcu - WolskII - WolskiEGO
			wyraz = wyraz.substring(0, len-1) + 'ego';
		else // PolskI - PolskiEGO
			wyraz += 'ego';
	}
	else if (wyrazU.endsWith('O')) // -O
	{
		if (['A','E','O','U'].includes(wyrazU[len-2])) // FalcAO
			return wyraz;
		else if (['I','J','L','Y'].includes(wyrazU[len-2])) // MarIO - MariA
			wyraz = wyraz.substring(0, len-1) + 'a';
		else // TołpiłO - TołopiłĘ
			wyraz = wyraz.substring(0, len-1) + 'ę';
	}
	// U
	else if (wyrazU.endsWith('U')) // -U
	{
		if (wyrazU[len-2] === 'A') // PorAU = PorauA
			wyraz += 'a';
		else if (wyrazU[len-2] === 'E') // PorEU - PoreuGO
			wyraz += 'go';
		else // nie odmieniamy wygłosowego -u
			return wyraz;
	}
	// Y
	else if (wyrazU.endsWith('Y')) // -Y
	{
		if (['A','E','O'].includes((wyrazU[len-2]))) // FaradAY - FaradayA
			wyraz += 'a';
		else // RakoczY - RakoczEGO
			wyraz = wyraz.substring(0, len-1) + 'ego';
	}
	else if (wyrazU.endsWith('EC') && vowelsCount(wyrazU) > 1) // 1-sylabowe: Pec - PecA
	{
		if (wyrazU.substring(len-4, len-2) === 'CI') // CzeCIEC - CzeĆCA
			wyraz = wyraz.substring(0, len-4) + 'ćca';
		else if (wyrazU.substring(len-4, len-2) === 'NI') // CzeNIEC - CzeŃCA
			wyraz = wyraz.substring(0, len-4) + 'ńca';
		else if (wyrazU.substring(len-4, len-2) === 'SI') // CzeSIEC - CzeŚCA
			wyraz = wyraz.substring(0, len-4) + 'śca';
		else if (wyrazU.substring(len-4, len-2) === 'ZI') // CzeZIEC - CzeŹCA
			wyraz = wyraz.substring(0, len-4) + 'źca';
		else if (wyrazU.substring(len-4, len-2) === 'RZ') // MaRZEC - MaRCA
			wyraz = wyraz.substring(0, len-4) + 'rca';
		else if (wyrazU.substring(len-3, len-2) === 'I') // CzepIEC - CzepCA
			wyraz = wyraz.substring(0, len-3) + 'ca';
		else // DerEC - DerCA
			wyraz = wyraz.substring(0, len-2) + 'ca';
	}
	else if (wyrazU.endsWith('EK') && vowelsCount(wyrazU) > 1) // 1-sylabowe: Pek - PekA
	{
		if (wyrazU.substring(len-4, len-2) === 'CI') // MaCIEK - MaĆKA
			wyraz = wyraz.substring(0, len-4) + 'ćka';
		else if (wyrazU.substring(len-4, len-2) === 'NI') // MaNIEK - MaŃKA
			wyraz = wyraz.substring(0, len-4) + 'ńka';
		else if (wyrazU.substring(len-4, len-2) === 'SI') // MaSIEK - MaŚKA
			wyraz = wyraz.substring(0, len-4) + 'śka';
		else if (wyrazU.substring(len-4, len-2) === 'ZI') // MaZIEK - MaŹKA
			wyraz = wyraz.substring(0, len-4) + 'źka';
		else if (wyrazU.substring(len-3, len-2) === 'I') // CzepIEK - CzepiekA
			wyraz += 'a';
		else // NeczEK - NeczKA
			wyraz = wyraz.substring(0, len-2) + 'ka';
	}
	else if (wyrazU.endsWith('Ć')) // ŚmieĆ - ŚmieCIA
		wyraz = wyraz.substring(0, len-1) + 'cia';
	else if (wyrazU.endsWith('Ń')) // ŚmieŃ - ŚmieNIA
		wyraz = wyraz.substring(0, len-1) + 'nia';
	else if (wyrazU.endsWith('Ś')) // ŚmieŚ - ŚmieSIA
		wyraz = wyraz.substring(0, len-1) + 'sia';
	else if (wyrazU.endsWith('Ź')) // ŚmieŹ - ŚmieZIA
		wyraz = wyraz.substring(0, len-1) + 'zia';
	else if (wyrazU.endsWith('X')) // WreX - WreKSA
		wyraz = wyraz.substring(0, len-1) + 'ksa';
	else if (!isVowel(wyrazU.substring(len-1))) // nie kończy się na samogłoskę
	{
		if (wyrazU[len-2] === 'Ó') // JamrÓz - JamrOzA
			wyraz = wyraz.substring(0, len-2) + 'o' + wyraz.substring(len-1) + 'a';
		else // Kozioł - KoziołA
			wyraz += 'a';
	}

	return wyraz;
}

function biernikNazwy(nazwa)
{
	let nazwaB = '';
	let czlony = nazwa.split(' ');
	czlony.forEach((czlon)=>
	{
		let czlonU = czlon.toUpperCase();
		let nieodmienialne = ['VAN', 'VON', 'VOM', 'DOS']; // Ulricha von Jungingena
		if (nieodmienialne.includes(czlonU) || czlon.length < 3)
			nazwaB += ' ' + czlon;
		else
			nazwaB += ' ' + biernik(czlon);
	});
	return nazwaB.trim();
}

function sendLocalizedAnnouncement(locArray, id, color, style, sound, formats)
{ // wysłanie wiadomości prywatnych w języku użytkownika
	// UWAGA: nie są wyświetlane na powtórkach
	let stringBuilder = '';
	let debugStr = '';
	if (id == null)
	{ // do wszystkich
		players.forEach(player =>
		{
			locArray.forEach(str =>
			{
				if (str.constructor() != '[object Object]')
					stringBuilder += str; // normalny tekst
				else
					stringBuilder += translate(str, player); // przetłumaczony tekst
			});
			stringBuilder = stringBuilder.format(formats); // zamiany ^
			room.sendAnnouncement(stringBuilder, player.id, color, style, sound);
			debugStr = stringBuilder;
			stringBuilder = '';
		});
		console.log('▌ %c' + debugStr, 'color:'+'#'+('00000'+color.toString(16)).substr(-6) + ';background-color:#0007'); // kolory w konsoli są zachowane
	}
	else
	{ // prywatna
		locArray.forEach(str =>
		{
			if (str.constructor() == '')
				stringBuilder += str; // normalny tekst
			else
				stringBuilder += translate(str, room.getPlayer(id)); // przetłumaczony tekst
			stringBuilder = stringBuilder.format(formats); // zamiany ^
		});
		room.sendAnnouncement(translate(locStr.PRIV, room.getPlayer(id)) + ' ' + stringBuilder, id, color, style, sound);
	}
}

let previousBallPosForGoingUp;
let currentBallPosForGoingUp;
function isBallGoingUp() // niewykorzystywana
{
    previousBallPosForGoingUp = currentBallPosForGoingUp;
    currentBallPosForGoingUp = room.getBallPosition().y;
    if (previousBallPosForGoingUp - currentBallPosForGoingUp > 0.01)
        isBallUp = 2;
	else if (previousBallPosForGoingUp - currentBallPosForGoingUp < -0.01)
        isBallUp = 1;
	else
        isBallUp = 0;
}

function displayAddedTime() // onGameTick
{ // doliczony czas
    let scores = room.getScores();
	let timeLimit = scores.timeLimit;
	let isDraw = scores.red == scores.blue;
	if (timeLimit > 0)
	{ // skończony czas
		if (scores.time > timeLimit-20 && isDraw && !isTimeAddedShown)
		{ // 20s przed końcem i nie pokazano wcześniej
			actualTimeAdded = Math.round(timeOutside/60 / 2); // 20/2=10s
			if (actualTimeAdded < 60 && actualTimeAdded > -1)
			{
				sendLocalizedAnnouncement(['+00:' + String(actualTimeAdded).padStart(2, '0')], null, 0x88FFAA, 'bold', 1);
			}
			else if (actualTimeAdded < 0)
			{
				sendLocalizedAnnouncement(['+00:00'], null, 0x88FFAA, 'normal', 1);
			}
			else
			{
				sendLocalizedAnnouncement(['+01:00'], null, 0x88FFAA, 'bold', 1);
			}
			isTimeAddedShown = true; // już pokazano
		}
	}
    else
	{ // limit playTimeInMinutes = 20 minut
		if (scores.time > playTimeInMinutes*60-20 && !isTimeAddedShown)
		{ // 20s przed upływem 20 minut i nie pokazano wcześniej
			actualTimeAdded = Math.round(timeOutside/60 / 8); // piłka przebywa poza boiskiem średnio przez 25% czasu gry, stąd dzielenie przez 8, żeby nie doliczać za dużo
			if (actualTimeAdded < 60 && actualTimeAdded > -1)
			{
				sendLocalizedAnnouncement(['+00:' + String(actualTimeAdded).padStart(2, '0')], null, 0x88FF88, 'bold', 1);
			}
			else if (actualTimeAdded < 0)
			{
				sendLocalizedAnnouncement(['+00:00'], null, 0x88FF88, 'normal', 1);
			}
			else
			{ // maksymalnie doliczamy minutę
				sendLocalizedAnnouncement(['+01:00'], null, 0x88FF88, 'bold', 1);
			}
			isTimeAddedShown = true; // już pokazano
		}
	}
}

function displayPossAutomatically() // onGameTick()
{ // wyświetlanie posiadania piłki co jakiś czas
	let scores = room.getScores();
	let timeLimit = scores.timeLimit;
	let trimmedTime = Math.floor(scores.time); // czas w sekundach zaokrąglony w dół
	if (trimmedTime > 0 && trimmedTime < playTimeInMinutes*60)
	{ // gra rozpoczęła się i jest przed 20. minutą
		if (trimmedTime % (autoPossIntervalInMinutes*60) === 0 && isAutoPossShown === false)
		{ // co 5 minut i nie wyświetlono przed chwilą
			possFun(); // wyświetlanie posiadania piłki
			isAutoPossShown = true; // już wyświetlono
		}
		if (trimmedTime % (autoPossIntervalInMinutes*60) > 0)
		{ // czas już nie jest wielokrotnością 5 minut
			isAutoPossShown = false; // można pokazać przypomnienie za 5 min
		}
	}
	else if (trimmedTime > playTimeInMinutes*60 + actualTimeAdded)
	{ // jest koniec doliczonego czasu
		if (isAutoPossShown === false)
		{
			possFun(); // wyświetlanie posiadania piłki
			isAutoPossShown = true; // już wyświetlono
		}
	}
}

function isOutsideLeftBound(position)
{ // za bramką czerwonych
	return position.x < -stadiumWidth;
}
function isOutsideRightBound(position)
{ // za bramką niebieskich
	return position.x > stadiumWidth;
}
function isOutsideUpBound(position)
{ // za linią górną
	return position.y < -stadiumHeight;
}
function isOutsideDownBound(position)
{ // za linią dolną
	return position.y > stadiumHeight;
}
function isOutsideStadium(position)
{ // poza boiskiem
    return isOutsideRightBound(position) || isOutsideLeftBound(position) || isOutsideDownBound(position) || isOutsideUpBound(position);
}

function handleAddedTime() // onGameTick
{ // doliczony czas
    let ballPosition = room.getBallPosition();
    if (isOutsideStadium(ballPosition))
    {
        timeOutside++; // w okresach (1/60s)
        return true;
    }
}

let isBallOutsideStadium = false;
function reactToOuts() // onGameTick
{ // informuje o autach, rożnych itd.
    let ballPosition = room.getBallPosition();
    if (isOutsideStadium(ballPosition))
	{ // jeżeli piłka jest poza boiskiem
        if (!isBallOutsideStadium)
		{ // jeżeli piłka nie była poza boiskiem
            isBallOutsideStadium = true; // piłka była poza poiskiem
            exitingXPos = ballPosition.x;
            let totalScores = room.getScores().red + room.getScores().blue;
            if (lastScores != totalScores)
			{ // jeżeli padła bramka, to nie wyświetlamy CK i GK
                lastScores = totalScores;
                return false;
            }
            if (isOutsideRightBound(ballPosition) && lastTeamTouched == Team.RED)
			{ // czerwony wywala za linię bramkową niebieskich
                lastCall = 'GK';
				sendLocalizedAnnouncement([locStr.GK, ' ', blueTeamName], null, 0xFFFF00, 'normal', 1);
            }
			else if (isOutsideLeftBound(ballPosition) && lastTeamTouched == Team.BLUE)
			{ // niebieski wywala za linię bramkową czerwonych
                lastCall = 'GK';
				sendLocalizedAnnouncement([locStr.GK, ' ', redTeamName], null, 0xFFFF00, 'normal', 1);
            }
            else if (isOutsideRightBound(ballPosition) && lastTeamTouched == Team.BLUE)
			{ // niebieski wywala za linię bramkową niebieskich
				sendLocalizedAnnouncement([locStr.CK, ' ', redTeamName], null, 0xFFFF00, 'normal', 1);
                lastCall = 'CK';
            }
			else if (isOutsideLeftBound(ballPosition) && lastTeamTouched == Team.RED)
			{ // czerwony wywala za linię bramkową czerwonych
				sendLocalizedAnnouncement([locStr.CK, ' ', blueTeamName], null, 0xFFFF00, 'normal', 1);
                lastCall = 'CK';
            }
            else
			{ // Auty
                isBallKickedOutside = false; // oczekiwanie na wykopanie
				if (lastTeamTouched == Team.RED)
					sendLocalizedAnnouncement([locStr.OUT, ' ', blueTeamName], null, 0xFFFF00, 'normal', 1);
				else
					sendLocalizedAnnouncement([locStr.OUT, ' ', redTeamName], null, 0xFFFF00, 'normal', 1);
                lastCall = lastTeamTouched == Team.RED ? '2' : '1';
            }
        }
    }
    else
	{
        isBallOutsideStadium = false; // piłka nie jest całkowicie poza boiskiem
        backFurtherMsgCanBeShown = true; // gotowość do pokazania do przodu/do tyłu
    }
    return true;
}

function getDistanceBetweenPoints(point1, point2)
{
    let distance1 = point1.x - point2.x;
    let distance2 = point1.y - point2.y;
    return Math.sqrt(distance1 * distance1 + distance2 * distance2);
}

function isTouchingBall(player)
{ // czy gracz dotyka piłkę
	let ballPosition = room.getBallPosition();
	let distancePlayerToBall = getDistanceBetweenPoints(player.position, ballPosition);
	return distancePlayerToBall < isBackFurtherNeededDistance;
}

function getLastTouchTheBall() // onGameTick
{ // dotknięcia piłki
    for (let i = 0; i < population; i++)
	{ // dla każdego gracza
        if (players[i].position != null)
		{ // jeżeli gracz w grze
            if (isTouchingBall(players[i]))
			{ // jeżeli gracz dotyka piłkę
                if (lastPlayerTouched != null && lastPlayerTouched.id != players[i].id)
                { // jeżeli gracz nie dotknął wcześniej piłki
                    if (lastTeamTouched == players[i].team) // jeżeli ostatnia drużyna to drużyna gracza
                        assistingPlayer = lastPlayerTouched;
					else
						assistingPlayer = null; // przeciwnik nie asystuje
                }
                lastTeamTouched = players[i].team; // dotknięcie przez drużynę
                previousPlayerTouched = lastPlayerTouched;
                lastPlayerTouched = players[i];
            }
        }
    }
    return lastPlayerTouched;
}

let playersNotInLine = new Array;
function getPlayersNotWithinLine() // onPlayerBallKick
{
    console.log('getPlayersNotWithinLine');
    playersNotInLine = new Array; // tablica graczy przekraczających linię
	for (let i = 0; i < population; i++)
	{ // dla każdego gracza
		if (players[i].position != null)
		{ // jeżeli gracz jest w grze
			if (players[i].team != lastTeamTouched)
			{ // jeżeli drużyna przeciwna dotknęła ostatnia
				if (lastCall != players[i].team && lastCall != 'CK' && lastCall != 'GK')
				{ // jeżeli ostatni komunikat to aut dla przeciwnika
					if ((players[i].position.y > greenLine || players[i].position.y < -greenLine) && getDistanceBetweenPoints(room.getBallPosition(), players[i].position) < 500)
						// jeżeli gracz przekracza linię boczną i jest bliżej niż 500 od piłki
						playersNotInLine.push(players[i].name); // wpis do tablicy
				}
			}
		}
	}
}

function printPlayersLine() // isThrowInCorrect
{ // wypisywanie przekraczających
    console.log('printPlayersLine');
    for (let i = 0; i < playersNotInLine.length; i++)
    {
		let found = false;
		for (let j = 0; j < lineCrossedPlayers.length; j++)
		{
			if (lineCrossedPlayers[j].name == playersNotInLine[i])
			{
				lineCrossedPlayers[j].times = lineCrossedPlayers[j].times + 1;
				sendLocalizedAnnouncement([locStr.LINE, ' ', lineCrossedPlayers[j].name, ' {', lineCrossedPlayers[j].times, '}'], null, 0xFFCC00, 'small', 1);
				found = true;
			}
		}
		if (!found)
		{
			lineCrossedPlayers.push(
			{
				name: playersNotInLine[i],
				times: 1,
				punished: false
			});
			sendLocalizedAnnouncement([locStr.LINE, ' ', playersNotInLine[i], ' {1}'], null, 0xFFCC00, 'small', 1);
		}
    }
}

let isBackFurtherNeeded = false;
let wrongThrowPosition = false;
function isBackRequired()
{
    let ballPosition = room.getBallPosition();
    if (!isBallKickedOutside)
    { // jeżeli piłki nie wykopano z autu
		if (lastCall=='1')
		{ // R
			if ((ballPosition.x - exitingXPos > throwInLeeway) && backFurtherMsgCanBeShown==true && isOutsideStadium(ballPosition) && ((ballPosition.y - outLineY > 20) || (ballPosition.y - outLineY < -20)))
			{
				backFurtherMsgCanBeShown = false;
				sendLocalizedAnnouncement(['<—— ', locStr.BACK], null, 0xFFFF00, 'normal', 1);
				isBackFurtherNeeded = true;
				wrongThrowPosition = true;
			}
			if ((ballPosition.x - exitingXPos < -throwInLeeway) && backFurtherMsgCanBeShown==true && isOutsideStadium(ballPosition) && ((ballPosition.y - outLineY > 20) || (ballPosition.y - outLineY < -20)))
			{
				backFurtherMsgCanBeShown = false;
				sendLocalizedAnnouncement([locStr.FURTHER, ' ——>'], null, 0xFFFF00, 'normal', 1);
				isBackFurtherNeeded = true;
				wrongThrowPosition = true;
			}
		}
		if (lastCall=='2')
		{ // B
			if ((ballPosition.x - exitingXPos > throwInLeeway) && backFurtherMsgCanBeShown==true && isOutsideStadium(ballPosition) && ((ballPosition.y - outLineY > 20) || (ballPosition.y - outLineY < -20)))
			{
				backFurtherMsgCanBeShown = false;
				sendLocalizedAnnouncement(['<—— ', locStr.FURTHER], null, 0xFFFF00, 'normal', 1);
				isBackFurtherNeeded = true;
				wrongThrowPosition = true;
			}
			if ((ballPosition.x - exitingXPos < -throwInLeeway) && backFurtherMsgCanBeShown==true && isOutsideStadium(ballPosition) && ((ballPosition.y - outLineY > 20) || (ballPosition.y - outLineY < -20)))
			{
				backFurtherMsgCanBeShown = false;
				sendLocalizedAnnouncement([locStr.BACK, ' ——>'], null, 0xFFFF00, 'normal', 1);
				isBackFurtherNeeded = true;
				wrongThrowPosition = true;
			}
		}
    }
    if (lastCall=='2' && isBackFurtherNeeded && isOutsideStadium && Math.abs(exitingXPos - ballPosition.x) < throwInLeeway-20)
    {
        sendLocalizedAnnouncement([locStr.OK], null, 0xFFFF00, 'normal', 1);
        isBackFurtherNeeded = false;
        wrongThrowPosition = false;
        backFurtherMsgCanBeShown = true;
    }
    if (lastCall=='1' && isBackFurtherNeeded && isOutsideStadium && Math.abs(exitingXPos - ballPosition.x) < throwInLeeway-20)
    {
        sendLocalizedAnnouncement([locStr.OK], null, 0xFFFF00, 'normal', 1);
        isBackFurtherNeeded = false;
        wrongThrowPosition = false;
        backFurtherMsgCanBeShown = true;
    }
}

function isThrowInCorrect() // onGameTick
{
    let ballPosition = room.getBallPosition();
    let isCrossing = isBallCrossingTheLine();
    let LTTstring = lastTeamTouched.toString();

    if (isCrossing && !isBallKickedOutside && LTTstring==lastCall && (lastCall=='1' || lastCall=='2'))
    {
        if (lastCall=='2')
        {
            sendLocalizedAnnouncement([locStr.OUT, ' ', redTeamName, ' ', locStr.BAD_THROW_IN], null, 0xFFFF00, 'small', 1);
        }
        if (lastCall=='1')
        {
            sendLocalizedAnnouncement([locStr.OUT, ' ', blueTeamName, ' ', locStr.BAD_THROW_IN], null, 0xFFFF00, 'small', 1);
        }

        isBallKickedOutside == false;
    }
	else if (isCrossing && LTTstring != lastCall && (lastCall=='1' || lastCall=='2'))
    {
        sendLocalizedAnnouncement([locStr.WRONG_TEAM], null, 0xFFFF00, 'small', 1);
        wrongThrowPosition = false;
        isBackFurtherNeeded = false;
    }
	else if (isCrossing && wrongThrowPosition && LTTstring==lastCall && (lastCall=='1' || lastCall=='2'))
    {
        sendLocalizedAnnouncement([locStr.WRONG_PLACE], null, 0xFFFF00, 'small', 1);
        wrongThrowPosition = false;
        isBackFurtherNeeded = false;
    }
	else if (isCrossing)
    {
        printPlayersLine();
    }
}

function isBallCrossingTheLine()
{ // sprawdza, czy piłka przekracza linię boczną
    previousBallYPosition = ballYPosition;
    ballYPosition = room.getBallPosition().y;
    crossed = (ballYPosition < stadiumHeight && previousBallYPosition > stadiumHeight) || (ballYPosition > -stadiumHeight && previousBallYPosition < -stadiumHeight);
    return crossed;
}

function hasBallLeftTheLine() // ???
{
    let ballPosition = room.getBallPosition();
    if (ballPosition.y < outLineY && isBallKickedOutside)
    {
    }
	else if (ballPosition.y > outLineY && isBallKickedOutside && lastPlayerTouched.id == previousPlayerTouched.id)
    {
        //sendLocalizedAnnouncement(['kruwa co robiła ta funkcja'], null, 0xFFFF00, 'normal', 1);
		console.log('hasBallLeftTheLine (kruwa)');
    }
}

class Cmd
{ // PWRHAX
  constructor(config, func)
	{
		this.cmd = config.cmd;
		this.params = config.params || [];
		this.hideInChat = config.hideInChat || false;
		this.onlyAdmin = config.onlyAdmin || false;
		this.helpText = config.helpText || []; // tablica tablic
		this.identical = config.identical || [];
		this.seeAlso = config.seeAlso || [];
		this.helpShort = config.helpShort || [];
		this.full = config.full || false;
		this.hidden = config.hidden || false;
		this.func = func;
  }
  
  canPlayerExecute(player)
	{
    if (this.onlyAdmin && !player.admin)
      return false;
    return true;
  }
  
  execute(args)
	{
    return this.func.apply(null, args);
  }
	
	getHelpText()
	{
		let message = [];
		this.helpText.forEach(h =>
		{
			message.push(h);
		});
		return message;
	}
  
  getHelpShort()
	{
		let message = [this.cmd, ' ', this.params];
		if (this.helpShort.length > 0)
		{
			message.push([' - ', this.helpShort]);
		}
		return message.flat(2);
  }
	
	getIdentical()
	{ // Komenda tożsama: BB, LEAVE
		let message = [];
		if (this.identical.length > 0)
			message.push([locStr.IDENTICAL_COMMAND, ': ', this.identical.join(', ')]);
		return message.flat();
	}
	
	getSeeAlso()
	{ // Zobacz też: CB, E
		let message = [];
		if (this.seeAlso.length > 0)
			message.push([locStr.SEE_ALSO, ': ', this.seeAlso.join(', ')]);
		return message.flat();
	}
}

/*
	****************************** Komendy ******************************
*/

let cmdArray = [];

cmdArray.push(new Cmd(
{
	cmd: '!HELP',
	params: ['<', locStr.COMMAND, '>'],
	helpText: [[locStr.EXAMPLE_USE, ': !help stats'],
	[locStr.HELP_HELP]]
}, (byPlayer, arg) =>
{
	arg = upperTrim(arg); // WIELKIE litery
	let cmdNames = [];
	cmdArray.forEach(c =>
	{ // zgromadź komendy bez !
		cmdNames.push(c.cmd.substring(1));
	});
	
	if (cmdNames.includes(arg))
	{ // jeżeli argument to nazwa komendy
		let cmd = findCmd('!' + arg);
		cmd.helpText.forEach(h =>
		{ // dla każdej tablicy (linijki) tekstu pomocy
			sendLocalizedAnnouncement(h, byPlayer.id, 0xFFFF00, 'normal', 1);
		});
		let bottomMessage = [];
		let isIdentical = cmd.getIdentical().length > 0;
		let isSeeAlso = cmd.getSeeAlso().length > 0;
		if (isIdentical)
			// jeżeli są komendy tożsame
			bottomMessage = bottomMessage.concat(cmd.getIdentical());
		if (isSeeAlso)
		{ // jeżeli są odwołania
			if (isIdentical) // jak jeszcze były tożsame, to dodać rozdzielacz
				bottomMessage.push(' ◽ ');
			bottomMessage = bottomMessage.concat(cmd.getSeeAlso());
		}
		if (bottomMessage.length > 0)
			sendLocalizedAnnouncement(bottomMessage, byPlayer.id, 0xFFFF00, 'small', 1);
	}
	else
	{ // jeżeli argument to nie komenda, to traktować jak !help
		let helpShortArray = [];
		cmdArray.forEach(c =>
		{
			if (!c.onlyAdmin && !c.hidden)
			{
				helpShortArray.push(c.getHelpShort());
			}
		});
		let message = [locStr.COMMANDS, ': '];
		let hsaSeparated = [];
		helpShortArray.forEach(e => hsaSeparated = hsaSeparated.concat([e, ' ◽ '])); // rozdzielanie komend
		hsaSeparated.pop(); // usunięcie ostatniego rozdzielenia
		helpShortArray = helpShortArray.flat(); // żeby nie było tablic zagnieżdżonych
		message = message.concat(hsaSeparated);
		message = message.flat();
		sendLocalizedAnnouncement(message, null, 0xFFFF00, 'normal', 1);
	}
}));

function possFun()
{ // !poss
	if (redPossessionTicks + bluePossessionTicks == 0) // Trzeba pamiętać o dziedzinie
		return false;
	let redPossessionPercentage = Math.round(redPossessionTicks / (redPossessionTicks+bluePossessionTicks) * 100);
	let bluePossessionPercentage = 100 - redPossessionPercentage;
	if (room.getScores() != null) // mecz trwa
		sendLocalizedAnnouncement([locStr.BALL_POSS, ': ', redTeamName, ' ', redPossessionPercentage, ' % ', bluePossessionPercentage, ' ', blueTeamName], null, 0xCCFF00, 'normal', 1);
	else
		sendLocalizedAnnouncement([locStr.LAST_BALL_POSS, ': ' + redTeamName, ' ', redPossessionPercentage, ' % ', bluePossessionPercentage, ' ', blueTeamName], null, 0xCCFF00, 'normal', 1);
}

cmdArray.push(new Cmd(
{
	cmd: '!POSS',
	helpText: [[locStr.HELP_POSS]],
	seeAlso: ['WHOSCORED']
}, () =>
{
	possFun();
}));

function printScorers()
{ // !whoscored
	let output = '▌'
	whoScoredList.forEach((s) =>
	{
		output += (s + ' ▌');
	});
	room.sendAnnouncement(output + '', null, 0x00FFFF, 'small', 1); // wyświetlanie na powtórkach
}

cmdArray.push(new Cmd(
{
	cmd: '!WHOSCORED',
	helpText: [[locStr.HELP_WHOSCORED]],
	seeAlso: ['POSS']
}, () =>
{
	printScorers();
}));

// PROSTE KOMENDY
cmdArray.push(new Cmd(
{
	cmd: '!ADMINHELP',
	helpText: [[locStr.HELP_ADMINHELP]],
	seeAlso: ['CB', 'E']
}, () =>
{
	let helpShortArray = [];
	cmdArray.forEach(c =>
	{ // dla każdej komendy
		if (c.onlyAdmin && !c.hidden)
		{ // jeżeli ta komenda jest tylko dla adminów i nie jest ukryta
			helpShortArray.push(c.getHelpShort()); // dodaj komendę z krótką pomocą
		}
	});
	let message = [locStr.ADMIN_COMMANDS, ': '];
	let hsaSeparated = [];
	helpShortArray.forEach(e => hsaSeparated = hsaSeparated.concat([e, ' ◽ '])); // rozdzielanie komend
	hsaSeparated.pop(); // usunięcie ostatniego rozdzielenia
	helpShortArray = helpShortArray.flat(); // żeby nie było tablic zagnieżdżonych
	message = message.concat(hsaSeparated);
	message = message.flat();
	sendLocalizedAnnouncement(message, null, 0xFFDD00, 'normal', 1);
}));

cmdArray.push(new Cmd(
{
	cmd: '!BEST',
	helpText: [[locStr.HELP_BEST_1],
	[locStr.HELP_BEST_2]],
	seeAlso: ['STATS']
}, () =>
{
	sendLocalizedAnnouncement(['🏆 Ranking: ' + ranking()], null, 0xFFFF00, 'normal', 1);
}));

cmdArray.push(new Cmd(
{
	cmd: '!INFO',
	helpText: [[locStr.HELP_INFO_1],
	[locStr.HELP_INFO_2]],
	identical: ['STATUS'],
	seeAlso: ['STATS']
}, () =>
{
	let pvpStr = [];
	if (pvp > 0)
		pvpStr = pvpStr.concat([locStr.RECOMMENDED, ': ', pvp, ' ', locStr.VS, ' ', pvp]);
	else
		pvpStr = [locStr.MATCHES_IMPOSSIBLE];
	sendLocalizedAnnouncement([locStr.POPULATION, ': ', population, ' (' , locStr.ACTIVE, ': ', activePop, '). '].concat(pvpStr), null, 0xFFFF00, 'normal', 1);
}));
cmdArray.push(new Cmd(
{
	cmd: '!STATUS',
	helpText: [[locStr.HELP_INFO_1],
	[locStr.HELP_INFO_2]],
	full: true,
	hidden: true,
	identical: ['INFO'],
	seeAlso: ['STATS']
}, () =>
{
	let pvpStr = [];
	if (pvp > 0)
		pvpStr = pvpStr.concat([locStr.RECOMMENDED, ': ', pvp, ' ', locStr.VS, ' ', pvp]);
	else
		pvpStr = [locStr.MATCHES_IMPOSSIBLE];
	sendLocalizedAnnouncement([locStr.POPULATION, ': ', population, ' (' , locStr.ACTIVE, ': ', activePop, '). '].concat(pvpStr), null, 0xFFFF00, 'normal', 1);
}));

// Gracz
cmdArray.push(new Cmd(
{
	cmd: '!LANG',
	params: ['<', locStr.CODE, '>'],
	helpText: [[locStr.EXAMPLE_USE, ': !lang pl'],
	[locStr.HELP_LANG]]
}, (byPlayer, arg) =>
{
	switch (arg)
	{
  case 'pl':
    setPlayerLanguage(byPlayer, 'pl');
		sendLocalizedAnnouncement(['Polski'], byPlayer.id, 0xFFFF00, 'small', 1);
    break;
  case 'en':
    setPlayerLanguage(byPlayer, 'en');
		sendLocalizedAnnouncement(['English (95%)'], byPlayer.id, 0xFFFF00, 'small', 1);
    break;
  case 'de':
    setPlayerLanguage(byPlayer, 'de');
		sendLocalizedAnnouncement(['Deutsch (15%)'], byPlayer.id, 0xFFFF00, 'small', 1);
    break;
	case 'tr':
    setPlayerLanguage(byPlayer, 'tr');
		sendLocalizedAnnouncement(['Türkçe (5%)'], byPlayer.id, 0xFFFF00, 'small', 1);
    break;
  default:
    setPlayerLanguage(byPlayer, arg);
		sendLocalizedAnnouncement(['⚠ ', locStr.UNKNOWN_LANGUAGE, '. Try !lang pl, !lang en, !lang de, !lang tr']
		, byPlayer.id, 0xFFCC00, 'normal', 1, [arg]);
    break;
	}
}));

cmdArray.push(new Cmd(
{
	cmd: '!PŁEĆ',
	params: ['<M/K>'],
	helpText: [[locStr.EXAMPLE_USES, ': !płeć m, !płeć k'],
	[locStr.HELP_GENDER]]
}, (byPlayer, arg) =>
{
	arg = upperTrim(arg)[0];
	if (arg === 'K' || arg ==='F')
	{
		setPlayerGender('K');
		sendLocalizedAnnouncement(['Dokonałaś wyboru'], byPlayer.id, 0xFFFF00, 'small', 1);
	}
	else
	{
		setPlayerGender('M');
		sendLocalizedAnnouncement(['Dokonałeś wyboru'], byPlayer.id, 0xFFFF00, 'small', 1);
	}
}));
cmdArray.push(new Cmd(
{
	cmd: '!SEX',
	params: ['<M/K>'],
	helpText: [[locStr.EXAMPLE_USES, ': !sex m, !sex k'],
	[locStr.HELP_GENDER]],
	full: true,
	hidden: true
}, (byPlayer, arg) =>
{
	arg = upperTrim(arg)[0];
	if (arg === 'K' || arg ==='F')
	{
		setPlayerGender('K');
		sendLocalizedAnnouncement(['Dokonałaś wyboru'], byPlayer.id, 0xFFFF00, 'small', 1);
	}
	else
	{
		setPlayerGender('M');
		sendLocalizedAnnouncement(['Dokonałeś wyboru'], byPlayer.id, 0xFFFF00, 'small', 1);
	}
}));
cmdArray.push(new Cmd(
{
	cmd: '!GENDER',
	params: ['<M/K>'],
	helpText: [[locStr.EXAMPLE_USES, ': !gender m, !gender k'],
	[locStr.HELP_GENDER]],
	full: true,
	hidden: true
}, (byPlayer, arg) =>
{
	arg = upperTrim(arg)[0];
	if (arg === 'K' || arg ==='F')
	{
		setPlayerGender('K');
		sendLocalizedAnnouncement(['Dokonałaś wyboru'], byPlayer.id, 0xFFFF00, 'small', 1);
	}
	else
	{
		setPlayerGender('M');
		sendLocalizedAnnouncement(['Dokonałeś wyboru'], byPlayer.id, 0xFFFF00, 'small', 1);
	}
}));

cmdArray.push(new Cmd(
{
	cmd: '!DISCORD',
	helpText: [[url]],
	full: true,
	hidden: true
}, (byPlayer, arg) =>
{
	sendLocalizedAnnouncement([locStr.NO_DISCORD], null, 0xFFFF00, 'small', 1);
}));
cmdArray.push(new Cmd(
{
	cmd: '!REGISTER',
	helpText: [[url]],
	full: true,
	hidden: true
}, (byPlayer, arg) =>
{
	sendLocalizedAnnouncement([locStr.NO_REGISTER], null, 0xFFFF00, 'small', 1);
}));
cmdArray.push(new Cmd(
{
	cmd: '!LOGIN',
	helpText: [[url]],
	full: true,
	hidden: true
}, (byPlayer, arg) =>
{
	sendLocalizedAnnouncement([locStr.NO_LOGIN], null, 0xFFFF00, 'small', 1);
}));

cmdArray.push(new Cmd(
{
	cmd: '!DEOP',
	helpText: [[locStr.HELP_DEOP]],
	full: true,
	hidden: true,
	identical: ['RESIGN']
}, (byPlayer) =>
{
	// Rezygnacja
    room.setPlayerAdmin(byPlayer.id, false);
}));
cmdArray.push(new Cmd(
{
	cmd: '!RESIGN',
	helpText: [[locStr.HELP_DEOP]],
	full: true,
	hidden: true,
	identical: ['DEOP']
}, (byPlayer) =>
{
	// Rezygnacja
    room.setPlayerAdmin(byPlayer.id, false);
}));

cmdArray.push(new Cmd(
{
	cmd: '!P',
	helpText: [[locStr.HELP_P]],
	helpShort: [locStr.PAUSE]
}, (byPlayer) =>
{
	if (!isPausingEnabled)
		// jeżeli pauzowanie jest niedozwolone
		sendLocalizedAnnouncement(['⛔ ', locStr.PAUSING_IS_DISABLED], byPlayer.id, 0xFFCC00, 'normal', 1);
	else if (room.getScores() == null)
		// inaczej jeżeli gra nie trwa
		sendLocalizedAnnouncement(['⛔ ', locStr.GAME_IS_STOPPED], byPlayer.id, 0xFFCC00, 'normal', 1);
	else if (byPlayer.team === 0)
		// inaczej jeżeli gracz jest na ławce
		sendLocalizedAnnouncement(['⛔ ', locStr.SPEC_CANT_PAUSE], byPlayer.id, 0xFFCC00, 'normal', 1);
	else
	{ // inaczej można
		if (isPaused)
		{
			room.pauseGame(false); // wznowienie gry
		}
		else
		{
			room.pauseGame(true); // wstrzymanie gry
			// todo: limit przerw i wznowień na gracza
		}
	}
}));

cmdArray.push(new Cmd(
{
	cmd: '!BB',
	helpText: [[locStr.HELP_BB]],
	full: true,
	identical: ['LEAVE']
}, (byPlayer) =>
{
	room.kickPlayer(byPlayer.id, '🔻 ' + byPlayer.name + ' ' + translate(locStr.LEAVES, byPlayer), false);
}));
cmdArray.push(new Cmd(
{
	cmd: '!LEAVE',
	helpText: [[locStr.HELP_BB]],
	full: true,
	identical: ['BB']
}, (byPlayer) =>
{
	room.kickPlayer(byPlayer.id, '🔻 ' + byPlayer.name + ' ' + translate(locStr.LEAVES, byPlayer), false);
}));

cmdArray.push(new Cmd(
{
	cmd: '!GETBALL',
	helpText: [['Wypisuje informacje o piłce']],
	hideInChat: true,
	full: true,
	hidden: true
}, (byPlayer) =>
{
	sendLocalizedAnnouncement(['Kulka: ' + JSON.stringify(room.getDiscProperties(0)).split(',').join(', ')], byPlayer.id, 0x5588FF, 'normal', 1);
	console.log('Kulka: ' + JSON.stringify(room.getDiscProperties(0)).split(',').join(', '));
}));

cmdArray.push(new Cmd(
{
	cmd: '!GETDISCCOUNT',
	helpText: [['Wypisuje liczbę dysków']],
	hideInChat: true,
	full: true,
	hidden: true
}, (byPlayer) =>
{
	sendLocalizedAnnouncement(['Liczba dysków: ' + room.getDiscCount()], byPlayer.id, 0x5588FF, 'normal', 1);
	console.log('Liczba dysków: ' + room.getDiscCount());
}));

cmdArray.push(new Cmd(
{
	cmd: '!KLUBY',
	helpText: [[locStr.HELP_KLUBY_1],
	[locStr.HELP_KLUBY_2]],
	hideInChat: true,
	seeAlso: ['KITSRED', 'KITSBLUE']
}, (byPlayer) =>
{
	sendLocalizedAnnouncement(['👀 ', locStr.CLUBS_LIST, ':'], byPlayer.id, 0x00FFFF, 'normal', 1);
	sendLocalizedAnnouncement(['Ekstraklasa:'], byPlayer.id, 0x0099FF, 'bold', 1);
	sendLocalizedAnnouncement(['[PIA]Piast Gliwice, [LEG]Legia Warszawa, [LGD]Lechia Gdańsk, [CRA]Cracovia, [JAG]Jagiellonia Białystok, [ZLU]Zagłębie Lubin, [POG]Pogoń Szczecin, [LPO]Lech Poznań, [WKR]Wisła Kraków, [KOR]Korona Kielce, [GZA]Górnik Zabrze, [ŚLĄ]Śląsk Wrocław, [ARK]Arka Gdynia, [WPŁ]Wisła Płock, [RAK]Raków Częstochowa, [ŁKS]ŁKS Łódź'], byPlayer.id, 0x00FFFF, 'normal', 1);
	sendLocalizedAnnouncement(['1 Liga:'], byPlayer.id, 0x0099FF, 'bold', 1);
	sendLocalizedAnnouncement(['[BBT]Bruk-Bet Termalica Nieciecza, [CCH]Chojniczanka Chojnice, [CHG]Chrobry Głogów, [JAS]GKS Jastrzębie, [BEŁ]GKS Bełchatów, [TYC]GKS Tychy, [MIE]Miedź Legnica, [ODO]Odra Opole, [OGR]Olimpia Grudziądz, [POD]Podbeskidzie Bielsko-Biała, [PNI]Puszcza Niepołomice, [RAD]Radomiak Radom, [SNS]Sandecja Nowy Sącz, [SMI]Stal Mielec, [STO]Stomil Olsztyn, [WAR]Warta Poznań, [WIG]Wigry Suwałki, [ZSO]Zagłębie Sosnowiec'], byPlayer.id, 0x00FFFF, 'normal', 1);
	sendLocalizedAnnouncement(['2 Liga:'], byPlayer.id, 0x0099FF, 'bold', 1);
	sendLocalizedAnnouncement(['[BŁS]Błękitni Stargard, [BYT]Bytovia Bytów, [ELA]Elana Toruń, [GAR]Garbarnia Kraków, [KAT]GKS Katowice, [GKŁ]Górnik Łęczna, [GPO]Górnik Polkowice, [GRW]Gryf Wejherowo, [LPO]Lech II Poznań, [LGO]Legionovia Legionowo, [ELB]Olimpia Elbląg, [PSI]Pogoń Siedlce, [RES]Resovia Rzeszów, [SKC]Skra Częstochowa, [STR]Stal Rzeszów, [SSW]Stal Stalowa Wola, [WID]Widzew Łódź, [ZNI]Znicz Pruszków'], byPlayer.id, 0x00FFFF, 'normal', 1);
	sendLocalizedAnnouncement(['3 Liga: [RCH]Ruch Chorzów'], byPlayer.id, 0x00FFFF, 'normal', 1);
	sendLocalizedAnnouncement(['4 Liga: [BZG]Boruta Zgierz'], byPlayer.id, 0x00FFFF, 'normal', 1);
}));

cmdArray.push(new Cmd(
{
	cmd: '!AFK',
	helpText: [[locStr.HELP_AFK]],
	seeAlso: ['AFKS']
}, (byPlayer) =>
{
	if (afks.includes(byPlayer.name))
	{ // powrót
		afks.splice(afks.indexOf(byPlayer.name), 1);
		sendLocalizedAnnouncement(['🔼 ', byPlayer.name, ' ', locStr.IS_NOT_AFK], null, 0xCCFF00, 'bold', 1);
	}
	else
	{ // zw
		// jeżeli jest w drużynie, to na ławkę go
		if (byPlayer.team != 0)
			room.setPlayerTeam(byPlayer.id, 0);
		afks.push(byPlayer.name);
		sendLocalizedAnnouncement(['🚾 ', byPlayer.name, ' ', locStr.IS_AFK], null, 0xCCCC99, 'bold', 1);
	}
	updateActiveList();
	[redTeam, blueTeam, specTeam] = whichTeam();
}));

cmdArray.push(new Cmd(
{
	cmd: '!AFKS',
	helpText: [[locStr.HELP_AFKS]],
	seeAlso: ['AFK']
}, () =>
{
	strAfks = ['🚾 ', locStr.AFKS, ': '];
	if (afks.length > 0)
	{
		strAfks.push(afks.join(' ◽ '));
		sendLocalizedAnnouncement(strAfks.flat(), null, 0xFFFF00, 'normal', 1); // bez ost. przecinka
	}
	else
	{
		sendLocalizedAnnouncement([locStr.NOTHING_HERE], null, 0xFFFF00, 'normal', 1);
	}
}));
/*
function resetStatsFun(player)
{ // !resetstats
    if (rankingCalc(player.name) > 0)
	{
        stats[upperTrim(player.name)] = {M:0, G:0, A:0, OG:0, CS:0, W:0, L:0, DW:0, DL:0};
        sendLocalizedAnnouncement(['Statystyki zresetowane!'], null, 0xFFFF00, 'normal', 1)
    }
	else
		sendLocalizedAnnouncement(['⚠ Warunkiem zresetowania statystyk jest posiadanie DODATNIEJ liczby punktów.'], null, 0xFFFF00, 'normal', 1);
}
*/
function playerToTeam(playerName, team)
{
	//room.setPlayerTeam()
}

function topFun(player)
{ // !top
	if (room.getScores() == null && player.team !== 0) // gra zatrzymana i gracz nie na ławc
	{
		if (player.id === redCap.id && redTeam.length < pvp)
			// jeżeli gracz to 1. czerwony i czerwonych jest mniej niż zalecana ilość
			topToRed(player);
		if (player.id === blueCap.id && blueTeam.length < pvp)
			// jeżeli gracz to 1. niebieski i niebieskich jest mniej niż zalecana ilość
			topToBlue(player);
		[redTeam, blueTeam, specTeam] = whichTeam();
	}
}

function topToRed()
{ // do czerwonych
	if (specTeam.length !== 0)
	{ // jeżeli istnieje ławka
		for (i = 0; i < pvp - redTeam.length; i++)
		{
			room.setPlayerTeam(specTeam[i].id, 1); // z góry z ławki do czerwonych
		}
	}
}

function topToBlue()
{ // do niebieskich
	if (specTeam.length !== 0)
	{ // jeżeli istnieje ławka
		for (i = 0; i < pvp - blueTeam.length; i++)
		{
			room.setPlayerTeam(specTeam[i].id, 2); // z góry z ławki do niebieskich
		}
	}
}

function randFun(player)
{ // !rand
	if (room.getScores() == null && player.team !== 0) // gra zatrzymana i gracz nie na ławce
	{
		randToRed(player);
		randToBlue(player);
		[redTeam, blueTeam, specTeam] = whichTeam();
	}
}

function randToRed(player)
{ // do czerwonych
	if (redTeam.length !== 0 && specTeam.length !== 0) // istnieją czerwoni i ławka
	{
		if (player.id === redCap.id) // gracz to 1. czerwony
		{
			// przechowalnia nr graczy z ławki
			let przenaszalni = [];
			// poprzednie losowania
			prevLos = [];
			//przenaszalnych musi być tyle, ile wolnych miejsc u czerwonych
			while (przenaszalni.length < pvp - redTeam.length)
			{
				los = randInt(0, specTeam.length-1); // losowanie nr miejsca na ławce
				// nie wrzucamy tego samego wiele razy
				if (!prevLos.includes(los))
				{ // możliwe inne warunki
					przenaszalni.push(los);
				}
				prevLos.push(los); // dodanie losu do poprzednich losowań
			}
			// z przenaszalnych do czerwonych
			while (przenaszalni.length > 0)
			{
				nr = przenaszalni.pop(); // branie nr przenaszalnego
				room.setPlayerTeam(specTeam[nr].id, 1); // z przenaszalnych do czerwonych
			}
		}
	}
}

function randToBlue(player)
{ // do niebieskich
	if (blueTeam.length !== 0 && specTeam.length !== 0) // istnieją niebiescy i ławka
	{
		if (player.id === blueCap.id) // gracz to 1. niebieski
		{
			// przechowalnia nr graczy z ławki
			let przenaszalni = [];
			// poprzednie losowania
			prevLos = [];
			//przenaszalnych musi być tyle, ile wolnych miejsc u niebieskich
			while (przenaszalni.length < pvp - blueTeam.length)
			{
				los = randInt(0, specTeam.length-1); // losowanie nr miejsca na ławce
				// nie wrzucamy tego samego wiele razy
				if (!prevLos.includes(los))
				{ // możliwe inne warunki
					przenaszalni.push(los);
				}
				prevLos.push(los); // dodanie losu do poprzednich losowań
			}
			// z przenaszalnych do niebieskich
			while (przenaszalni.length > 0)
			{
				nr = przenaszalni.pop(); // branie nr przenaszalnego
				room.setPlayerTeam(specTeam[nr].id, 2); // z przenaszalnych do niebieskich
			}
		}
	}
}

cmdArray.push(new Cmd(
{
	cmd: '!MAPY',
	helpText: [[locStr.HELP_MAPY_1],
	[locStr.HELP_MAPY_2]],
	hideInChat: true,
	seeAlso: ['LOAD']
}, (byPlayer) =>
{
	let str = [];
	str.push(Object.keys(maps).join(' ◽ '));
	sendLocalizedAnnouncement(['👀 ', locStr.MAPS_LIST, ':'], byPlayer.id, 0x00FFFF, 'bold', 1);
	sendLocalizedAnnouncement(str.flat(), byPlayer.id, 0x00FFFF, 'normal', 1);
}));

cmdArray.push(new Cmd(
{
	cmd: '!OP',
	params: ['<hasło>'],
	helpText: [['Daje admina po wpisaniu poprawnego hasła po spacji']],
	hideInChat: true,
	full: true,
	hidden: true,
	seeAlso: ['DEOP']
}, (byPlayer, arg) =>
{
	// Daje wpisującemu admina
	if (arg === adminPassword)
		room.setPlayerAdmin(byPlayer.id, true);
    return false;
}));

cmdArray.push(new Cmd(
{
	cmd: '!GETDISC',
	params: ['<nr>'],
	helpText: [[locStr.EXAMPLE_USE, ': !getdisc 0'],
	['Wyświetla właściwości dysku']],
	hideInChat: true,
	full: true,
	hidden: true,
}, (byPlayer, arg) =>
{
	sendLocalizedAnnouncement(['Dysk ', arg, ': ', JSON.stringify(room.getDiscProperties(arg)).split(',').join(', ')], byPlayer.id, 0x5588FF, 'normal', 1);
	console.log('Dysk ' + arg + ': ' + JSON.stringify(room.getDiscProperties(arg)).split(',').join(', '));
}));

cmdArray.push(new Cmd(
{
	cmd: '!GETPLAYER',
	params: ['<id>'],
	helpText: [[locStr.EXAMPLE_USE, ': !getplayer 0'],
	['Wyświetla właściwości dysku gracza']],
	hideInChat: true,
	full: true,
	hidden: true,
}, (byPlayer, arg) =>
{
	sendLocalizedAnnouncement([locStr.PLAYER_C, ' ', arg, ': ', JSON.stringify(room.getPlayerDiscProperties(arg)).split(',').join(', ')], byPlayer.id, 0x5588FF, 'normal', 1);
	console.log('Gracz ' + arg + ': ' + JSON.stringify(room.getPlayerDiscProperties(arg)).split(',').join(', '));
}));

cmdArray.push(new Cmd(
{
	cmd: '!STATS',
	params: ['[<', locStr.NICK , '>]'],
	helpText: [[locStr.EXAMPLE_USES, ': !stats, !stats 🗿Sędzia Kalosz'],
	[locStr.HELP_STATS_1],
	[locStr.HELP_STATS_2]],
	seeAlso: ['BEST']
}, (byPlayer, arg) =>
{
	arg = upperTrim(arg);
	let playerNames = new Map();
	players.forEach((p)=>
	{
		playerNames[p.name.toUpperCase()] = p.name;
	});
	if (!hostHidden)
		playerNames[hostName] = hostName;

	let namesAutocompleted = autocomplete(arg, Object.keys(playerNames));

	if (playerNames.hasOwnProperty(arg))
		sendStats(arg);
	else if (namesAutocompleted.length > 0 && arg !== '')
	{
		if (namesAutocompleted.length === 1) // 1 dopasowanie
			sendStats(namesAutocompleted[0]);
		else
		{ // kilka dopasowań
			let str = [locStr.PLAYERS_STARTING_WITH, ' ', arg, ': '];
			for (let i = 0; i < namesAutocompleted.length; i++)
			{
				str.push(namesAutocompleted[i]);
				if (i > 10 || i === namesAutocompleted.length-1)
					break; // nie dopisywać przecinka na koniec
				str.push(', ');
			}
			sendLocalizedAnnouncement(str, byPlayer.id, 0xFFCC00, 'normal', 1);
		}
	}
	else // swoje statystyki
		sendStats(byPlayer.name);
}));

cmdArray.push(new Cmd(
{
	cmd: '!KITSRED',
	params: ['<', locStr.CLUB , '>'],
	helpText: [[locStr.EXAMPLE_USES, ': !kitsred Wisła Kraków, !kitsred WKR'],
	[locStr.HELP_KITSRED]],
	seeAlso: ['KITSBLUE', 'KLUBY']
}, (byPlayer, arg) =>
{
	arg = upperTrim(arg);
	let klubyNaArg = autocomplete(arg, Object.keys(kluby));

	if (skluby[arg] != undefined)
	{
		let klub = skluby[arg];
		room.setTeamColors(1, kluby[klub][0], kluby[klub][1], kluby[klub][2]);
		redTeamName = redTeamPrefix + '' + upperTrim(skluby[arg]);
		sendLocalizedAnnouncement([locStr.RED_ARE, ': ', skluby[arg]], null, 0xFFFF00, 'normal', 1);
	}
	// Nazwy klubów
	else if (klubyNaArg.length > 0)
	{
		if (klubyNaArg.length === 1)
		{ // jeżeli pasuje jeden klub
			room.setTeamColors(1, kluby[klubyNaArg[0]][0], kluby[klubyNaArg[0]][1], kluby[klubyNaArg[0]][2]);
			redTeamName = redTeamPrefix + '' + upperTrim(klubyNaArg[0]);
			sendLocalizedAnnouncement([locStr.RED_ARE, ': ', klubyNaArg[0]], null, 0xFFFF00, 'normal', 1);
		}
		else
		{ // jeżeli pasuje wiele klubów
			let str = [locStr.CLUBS_STARTING_WITH, ' ', arg, ': '];
			for (let i = 0; i < klubyNaArg.length; i++)
			{
				str.push(klubyNaArg[i]);
				if (i > 14 || i === klubyNaArg.length-1)
					break; // nie dopisywać przecinka na koniec
				str.push(', ');
			}
			sendLocalizedAnnouncement(str, byPlayer.id, 0xFFCC00, 'normal', 1);
		}
	}
	else
		sendLocalizedAnnouncement(['⛔', locStr.NO_CLUB_STARTING_WITH, ' ', arg, '. ', locStr.EXAMPLE_USE, ': !kitsred Wisła Kraków. ', locStr.CHECK_C, ' !kluby'], byPlayer.id, 0xFFCC00, 'normal', 1);
}));

cmdArray.push(new Cmd(
{
	cmd: '!KITSBLUE',
	params: ['<', locStr.CLUB , '>'],
	helpText: [[locStr.EXAMPLE_USES, ': !kitsblue Wisła Płock, !kitsblue WPŁ'],
	[locStr.HELP_KITSBLUE]],
	seeAlso: ['KITSRED', 'KLUBY']
}, (byPlayer, arg) =>
{
	arg = upperTrim(arg);
	let klubyNaArg = autocomplete(arg, Object.keys(kluby));

	// Skrót klubu
	if (skluby[arg] != undefined)
	{
		let klub = skluby[arg];
		room.setTeamColors(2, kluby[klub][0], kluby[klub][1], kluby[klub][2]);
		blueTeamName = blueTeamPrefix + '' + upperTrim(skluby[arg]);
		sendLocalizedAnnouncement([locStr.BLUE_ARE, ': ', skluby[arg]], null, 0xFFFF00, 'normal', 1);
	}
	// Nazwy klubów
	else if (klubyNaArg.length > 0)
	{
		if (klubyNaArg.length === 1)
		{ // jeżeli pasuje jeden klub
			room.setTeamColors(2, kluby[klubyNaArg[0]][0], kluby[klubyNaArg[0]][1], kluby[klubyNaArg[0]][2]);
			blueTeamName = blueTeamPrefix + '' + upperTrim(klubyNaArg[0]);
			sendLocalizedAnnouncement([locStr.BLUE_ARE, ': ', klubyNaArg[0]], null, 0xFFFF00, 'normal', 1);
		}
		else
		{ // jeżeli pasuje wiele klubów
			let str = [locStr.CLUBS_STARTING_WITH, ' ', arg, ': '];
			for (let i = 0; i < klubyNaArg.length; i++)
			{
				str.push(klubyNaArg[i]);
				if (i > 14 || i === klubyNaArg.length-1)
					break; // nie dopisywać przecinka na koniec
				str.push(', ');
			}
			sendLocalizedAnnouncement(str, byPlayer.id, 0xFFCC00, 'normal', 1);
		}
	}
	else
		sendLocalizedAnnouncement(['⛔', locStr.NO_CLUB_STARTING_WITH, ' ', arg, '. ', locStr.EXAMPLE_USE, ': !kitsred Wisła Płock. ', locStr.CHECK_C, ' !kluby'], byPlayer.id, 0xFFCC00, 'normal', 1);
}));

cmdArray.push(new Cmd(
{
	cmd: '!PM',
	params: ['#<id>', '<', locStr.MESSAGE, '>'],
	helpText: [[locStr.EXAMPLE_USE, ': !pm #0 ', locStr.MESSAGE],
	[locStr.HELP_PM]],
	hideInChat: true,
	full: true,
	hidden: true
}, (byPlayer, arg) =>
{
	sendPM(byPlayer, arg);
}));

function sendPM(byPlayer, message)
{
  if (message.startsWith("@"))
	{
		let spacePos = message.search(" ");
    let name = message.substr(1, spacePos !== -1 ? spacePos - 1 : message.length);
    let toPlayer = room.getPlayerList().filter((byPlayer) => byPlayer.name === name);
    if (toPlayer.length !== 0)
		{
      message = message.substr(spacePos, message.length);
      room.sendAnnouncement("Otrzymano prywatną wiadomość od " + byPlayer.name + ": " + message, toPlayer[0].id, 0x00cc33, 'small-bold', 2);
      room.sendAnnouncement("Wysłano prywatną wiadomość do " + toPlayer[0].name + ": " + message, byPlayer.id, 0x00cc33, 'small-bold', 2);			
		}
	}
	else if (message.startsWith("#"))
	{
		let spacePos = message.search(" ");
    let id = message.substr(1, spacePos !== -1 ? spacePos - 1 : message.length);
    let toPlayer = room.getPlayerList().filter((byPlayer) => byPlayer.id == id);
    if (toPlayer.length !== 0)
		{
      message = message.substr(spacePos, message.length);
      room.sendAnnouncement("Otrzymano prywatną wiadomość od " + byPlayer.name + ": " + message, toPlayer[0].id, 0x00cc33, 'small-bold', 2);
      room.sendAnnouncement("Wysłano prywatną wiadomość do " + toPlayer[0].name + ": " + message, byPlayer.id, 0x00cc33, 'small-bold', 2);			
		}
	}
}

// Admin
cmdArray.push(new Cmd(
{
	cmd: '!CB',
	helpText: [[locStr.HELP_CB]],
	helpShort: [locStr.CLEAR_BANS],
	onlyAdmin: true,
}, () =>
{
	room.clearBans();
	sendLocalizedAnnouncement(['✔ ', locStr.BANS_CLEARED], null, 0x00FF00, 'normal', 1);
}));

cmdArray.push(new Cmd(
{
	cmd: '!SWAP',
	helpText: [[locStr.HELP_SWAP]],
	onlyAdmin: true
}, () =>
{
	if (room.getScores() == null) // gra zatrzymana
	{
		for (i = 0; i < players.length; i++)
		{
			if (players[i].team === 1)
				room.setPlayerTeam(players[i].id, 2);
			else if (players[i].team === 2)
				room.setPlayerTeam(players[i].id, 1);
		}
	}
	else
		sendLocalizedAnnouncement(['⛔ ' + locStr.GAME_MUST_BE_STOPPED], null, 0xFF3300, 'normal', 1);
}));

cmdArray.push(new Cmd(
{
	cmd: '!AUTOPOSS',
	helpText: [[locStr.HELP_AUTOPOSS]],
	onlyAdmin: true,
	seeAlso: ['REF', 'BALLCOLOR']
}, () =>
{
	isAutoPossEnabled = !isAutoPossEnabled;
	sendLocalizedAnnouncement([locStr.AUTO_BALL_POSS_DISPLAY, ' ', (isAutoPossEnabled ? locStr.ENABLED : locStr.DISABLED)], null, 0xFFFF00, 'normal', 1);
}));

cmdArray.push(new Cmd(
{
	cmd: '!RZUTSĘDZIOWSKI',
	helpText: [[locStr.HELP_RZUTSĘDZIOWSKI]],
	onlyAdmin: true,
	full: true,
	hidden: true,
	identical: ['DROPPEDBALL']
}, () =>
{
	if (room.getScores() != null)
	{ // jeżeli gra trwa
		room.setDiscProperties(0, {x: 0, y: 0}); // umieszczenie piłki na środku boiska
		sendLocalizedAnnouncement([locStr.DROPPED_BALL, '!'], null, 0xFFFF00, 'bold', 1);
	}
}));
cmdArray.push(new Cmd(
{
	cmd: '!DROPPEDBALL',
	helpText: [[locStr.HELP_RZUTSĘDZIOWSKI]],
	onlyAdmin: true,
	full: true,
	hidden: true,
	identical: ['RZUTSĘDZIOWSKI']
}, () =>
{
	if (room.getScores() != null)
	{ // jeżeli gra trwa
		room.setDiscProperties(0, {x: 0, y: 0}); // umieszczenie piłki na środku boiska
		sendLocalizedAnnouncement([locStr.DROPPED_BALL, '!'], null, 0xFFFF00, 'bold', 1);
	}
}));

cmdArray.push(new Cmd(
{
	cmd: '!REF',
	helpText: [[locStr.HELP_REF]],
	onlyAdmin: true,
	seeAlso: ['AUTOPOSS', 'BALLCOLOR']
}, () =>
{
	if (isRSRefEnabled)
		sendLocalizedAnnouncement([locStr.REF_DISMISSED], null, 0xFFFF00, 'normal', 1);
	else
		sendLocalizedAnnouncement([locStr.REF_CALLED_UP], null, 0xFFFF00, 'normal', 1);
	isRSRefEnabled = !isRSRefEnabled;
}));

// Admin i argumenty
cmdArray.push(new Cmd(
{
	cmd: '!TRED',
	params: ['<', locStr.NAME, '>'],
	helpText: [[locStr.EXAMPLE_USE, ': !tred CZERWONI'],
	[locStr.HELP_TRED]],
	onlyAdmin: true,
	seeAlso: ['TBLUE', 'REF']
}, (byPlayer, arg) =>
{
	redTeamName = redTeamPrefix + '' + upperTrim(arg);
	sendLocalizedAnnouncement([locStr.RED_ARE, ': ', redTeamName], null, 0xFFFF00, 'normal', 0);
}));

cmdArray.push(new Cmd(
{
	cmd: '!TBLUE',
	params: ['<', locStr.NAME, '>'],
	helpText: [[locStr.EXAMPLE_USE, ': !tblue NIEBIESCY'],
	[locStr.HELP_TBLUE]],
	onlyAdmin: true,
	seeAlso: ['TRED', 'REF']
}, (byPlayer, arg) =>
{
	blueTeamName = blueTeamPrefix + '' + upperTrim(arg);
	sendLocalizedAnnouncement([locStr.BLUE_ARE, ': ', blueTeamName], null, 0xFFFF00, 'normal', 0);
}));

cmdArray.push(new Cmd(
{
	cmd: '!LOAD',
	params: ['<', locStr.NAME, '>'],
	helpText: [[locStr.EXAMPLE_USE, ': !load rs',
	locStr.HELP_LOAD]],
	onlyAdmin: true,
	seeAlso: ['MAPY']
}, (byPlayer, arg) =>
{
	if (room.getScores() == null)
	{ // jeżeli nie ma meczu
		arg = upperTrim(arg);
		let mapyNaArg = autocomplete(arg, Object.keys(maps));

		if (maps.hasOwnProperty(arg))
			// jeżeli to dokładne dopasowanie
			room.setCustomStadium(maps[arg]);
		else if (mapyNaArg.length > 0)
		{ // inaczej jeżeli pasują jakieś mapy
			if (mapyNaArg.length === 1)
			{ // jeżeli pasuje jedna mapa
				room.setCustomStadium(maps[mapyNaArg[0]]);
			}
			else
			{ // inaczej jeżeli pasuje wiele map
				let str = [locStr.MAPS_STARTING_WITH, ' ', arg, ': '];
				for (let i = 0; i < mapyNaArg.length; i++)
				{
					str.push(mapyNaArg[i]);
					if (i > 14 || i === mapyNaArg.length-1)
						break; // nie dopisywać przecinka na koniec
					str.push(', ');
				}
				sendLocalizedAnnouncement(str, byPlayer.id, 0xFFCC00, 'normal', 1);
			}
		}
		else // nic nie pasuje
			sendLocalizedAnnouncement(['⛔ ', locStr.NO_MAP_STARTING_WITH ,': ', arg, '. ', locStr.CHECK_C, ' !mapy'], byPlayer.id, 0xFFCC00, 'normal', 1);
	}
	else
		sendLocalizedAnnouncement(['⛔ ', locStr.GAME_MUST_BE_STOPPED], byPlayer.id, 0xFFCC00, 'normal', 1);
}));

cmdArray.push(new Cmd(
{
	cmd: '!E',
	params: [['<', locStr.MESSAGE, '>']],
	helpText: [[locStr.EXAMPLE_USE, ': !e nie spać',
	locStr.HELP_E]],
	onlyAdmin: false, // inny komunikat dla śmiertelników
	hideInChat: true,
	hidden: true
}, (byPlayer, arg) =>
{
	if (byPlayer.admin === true)
	{
		sendLocalizedAnnouncement([byPlayer.name + ': ' + arg], null, 0xCC55FF, 'bold', 2);
	}
	else
		sendLocalizedAnnouncement([locStr.QUIET_E], byPlayer.id, 0xFFCC00, 'normal', 1);
}));

cmdArray.push(new Cmd(
{
	cmd: '!SETDISC',
	params: ['<nr>', '<właściwość>', '<wartość>'],
	helpText: [[locStr.EXAMPLE_USE, ': !setdisc 0 x 0'],
	['Zmienia wartość właściwości dysku']],
	onlyAdmin: true,
	hideInChat: true,
	full: true,
	hidden: true,
}, (byPlayer, arg) =>
{
	let ktory;
	let co;
	let ileRaw;
	let ile;

	let spacePos = arg.search(' ');
	if (spacePos > -1)
	{
		ktory = parseInt(arg.substr(0, spacePos)); // |0| x 0

		let arg2 = arg.substr(spacePos+1, arg.length); // 0 |x 0|
		let spacePos2 = arg2.search(' ');
		if (spacePos2 > -1)
		{
			co = arg2.substr(0, spacePos2); // |x| 0
			ileRaw = arg2.substr(spacePos2 + 1, arg2.length); // x |0|
			if (upperTrim(ileRaw).substr(0, 2) === '0X') // czy wartość jest szesnastkowa (np. przy ustawianiu koloru)
				ile = parseInt(ileRaw);
			else
				ile = parseFloat(ileRaw);
		}
	}
	else
	{
		sendLocalizedAnnouncement([locStr.FAILED], byPlayer.id, 0xFFCC00, 'normal', 1);
		return;
	}
	let coIle = {};
	coIle[co] = ile; // {x: 0}
	room.setDiscProperties(ktory, coIle); // (0, {x: 0})

	sendLocalizedAnnouncement(['Dysk: ' + ktory + ' ma teraz wartość: ' + co + ' równą: ' + ile], byPlayer.id, 0x5588FF, 'normal', 1);
	console.log('Dysk: ' + ktory + ' ma teraz wartość: ' + co + ' równą: ' + ile);
}));

cmdArray.push(new Cmd(
{
	cmd: '!SETPLAYER',
	params: ['<id>', '<właściwość>', '<wartość>'],
	helpText: [[locStr.EXAMPLE_USE, ': !setplayer 0 x 0'],
	['Zmienia wartość właściwości dysku gracza']],
	onlyAdmin: true,
	hideInChat: true,
	full: true,
	hidden: true,
}, (byPlayer, arg) =>
{
	let id;
	let co;
	let ileRaw;
	let ile;

	let spacePos = arg.search(' ');
	if (spacePos > -1)
	{
		id = parseInt(arg.substr(0, spacePos));

		let arg2 = arg.substr(spacePos+1, arg.length);
		let spacePos2 = arg2.search(' ');
		if (spacePos2 > -1)
		{
			co = arg2.substr(0, spacePos2);
			ileRaw = arg2.substr(spacePos2 + 1, arg2.length);
			if (upperTrim(ileRaw).substr(0, 2) === '0X')
				ile = parseInt(ileRaw);
			else
				ile = parseFloat(ileRaw);
		}
	}
	else
	{
		sendLocalizedAnnouncement([locStr.FAILED], byPlayer.id, 0xFFCC00, 'normal', 1);
		return;
	}
	let coIle = {};
	coIle[co] = ile;
	room.setPlayerDiscProperties(id, coIle);

	sendLocalizedAnnouncement(['Dysk gracza: ' + id + ' ma teraz wartość: ' + co + ' równą: ' + ile], byPlayer.id, 0x5588FF, 'normal', 1);
	console.log('Dysk gracza: ' + id + ' ma teraz wartość: ' + co + ' równą: ' + ile);
}));

cmdArray.push(new Cmd(
{
	cmd: '!SETBALL',
	params: ['<właściwość>', '<wartość>'],
	helpText: [[locStr.EXAMPLE_USE, ': !setball x 0'],
	['Zmienia wartość właściwości piłki']],
	onlyAdmin: true,
	hideInChat: true,
	full: true,
	hidden: true,
}, (byPlayer, arg) =>
{
	let arg2 = '0 ' + arg;
	findCmd('!SETDISC').func(byPlayer, arg2);
}));

cmdArray.push(new Cmd(
{
	cmd: '!BALLCOLOR',
	params: ['<', locStr.COLOR_IN_HEX, '>'],
	helpText: [[locStr.EXAMPLE_USES, ': !ballcolor 0xFFFF00, !ballcolor reset'],
	['Zmienia kolor kulki i nie resetuje się do odwołania.'],
	['Kolorem musi być liczba całkowita lub szesnastkowa w formacie 0xRRGGBB. Aby zresetować kolor kulki do domyślnego, należy wpisać !ballcolor reset']],
	onlyAdmin: true,
	seeAlso: ['AUTOPOSS', 'REF']
}, (byPlayer, arg) =>
{ // !ballcolor 0xffffff - koloruje piłkę na kolor 0xffffff (biały) na stałe
  // !ballcolor - czyni piłkę przezroczystą i umożliwia zresetowanie koloru po bramce lub nowej grze
	ballColor = parseInt(arg);
	if (isNaN(ballColor))
	{ // gdy kolor nie jest liczbą
		room.setDiscProperties(0, {color: -1}); // kulka przezroczysta
		sendLocalizedAnnouncement([locStr.BALL_COLOR_CHANGE_SUSPENDED], null, 0xFFFF00, 'normal', 1);
	}
	else
	{
		room.setDiscProperties(0, {color: ballColor});
		sendLocalizedAnnouncement([locStr.BALL_COLOR_CHANGED_TO, ': ' + ballColor], null, 0xFFFF00, 'normal', 1);
	}
}));

cmdArray.push(new Cmd(
{
	cmd: '!K',
	params: ['<id>', '[<', locStr.REASON, '>]'],
	helpText: [[locStr.EXAMPLE_USE, ': !k 0 afk'],
	[locStr.HELP_K]],
	helpShort: [locStr.KICK_SB],
	onlyAdmin: true,
	seeAlso: ['CB']
}, (byPlayer, arg) =>
{
	let idOfiary;
	let powod;

	spacePos = arg.search(' ');
	if (spacePos > -1)
	{
		idOfiary = arg.substr(0, spacePos);
		powod = arg.substr(spacePos + 1, arg.length);
	}
	else
	{
		idOfiary = arg;
		powod = null;
	}

	if (powod != null)
		room.kickPlayer(idOfiary, locStr.KICKED_BY, ': ' + byPlayer.name + ' , ' + locStr.REASON + ': ' + powod, false);
	else
		room.kickPlayer(idOfiary, locStr.KICKED_BY, ': ' + byPlayer.name, false);
}));

function muteFun(player, arg)
{ // !m 🗿Sędzia Kalosz
    // Admin wycisza niewyciszonego gracza
	let name = upperTrim(arg);
	if (getIdByPlayerName(arg) != null) // gracz istnieje
	{
		if (!(name in muted)) // Nie wyciszono wcześniej
		{
			muted[name] = 30; // todo: na 30 sekund
			sendLocalizedAnnouncement(['🔇 ', locStr.MUTED, ': ', arg], null, 0xCCCCCC, 'normal', 1);
		}
		else // wyciszono wcześniej
			sendLocalizedAnnouncement(['⛔ ', locStr.ALREADY_MUTED, ': ', arg], player.id, 0xFFCC00, 'normal', 1);
	}
	else // gracz nie istnieje
		sendLocalizedAnnouncement(['⛔ ', locStr.PLAYER_C, ': ', arg, ' nie istnieje'], player.id, 0xFFCC00, 'normal', 1);
}

function unmuteFun(player, arg)
{ // !um 🗿Sędzia Kalosz
    // Admin odcisza gracza
	let name = upperTrim(arg);
	if (getIdByPlayerName(arg) != null) // gracz istnieje
	{
		if (muted[name] != 0)
		{
			muted[name] = 0;
			sendLocalizedAnnouncement(['🔈 ', locStr.UNMUTED, ': ', arg], null, 0xCCFF99, 'normal', 1);
		}
		else
			sendLocalizedAnnouncement(['⛔ ', locStr.ALREADY_UNMUTED, ': ', arg], player.id, 0xFFCC00, 'normal', 1);
	}
	else // gracz nie istnieje
		sendLocalizedAnnouncement(['⛔ ', locStr.PLAYER_C, ': ', arg, ' nie istnieje'], player.id, 0xFFCC00, 'normal', 1);
}

function gotMutedFun(player)
{
	if (!(upperTrim(player.name) in muted))
		return true;
}

function unmuteAll()
{
	Object.keys(muted).forEach((m) =>
	{
		muted[m]=0;
	});
}

/*
    ******************************Ranking******************************
*/
function rankingCalc(playerName)
{
    return stats[playerName]['G'] * 3 + stats[playerName]['A'] * 1
           + stats[playerName]['W'] * 3 + stats[playerName]['L'] * 0
		   - stats[playerName]['OG'] * 2 + stats[playerName]['CS'] * 1
		   + stats[playerName]['DW'] * 2 + stats[playerName]['DL'] * 1;
}

function ranking()
{
  let rankList = [];
  let rankedPlayerNames = Object.keys(stats);
	let initial = hostHidden ? 0 : 1;
  for (i = initial; i < rankedPlayerNames.length; i++) // 1 to undefined
	{
    let score = rankingCalc(rankedPlayerNames[i]) // pkty gracza
    // Bramka: 3, asysta: 1, Z: 3, P: 0, samobój: -2, CZ K: 1, ZD: 2, PD: 1
    rankList.push({name: rankedPlayerNames[i], value: score}); // Gracz, pkty
  }
  rankList.sort(function(a,b) // według większej ilości pktów
	{
    return b.value - a.value;
  });

	let rankString = '';
	let len = rankList.length;
	for (i = 0; i < len; i++)
	{
		rankString += i + 1 + ') ' + rankList[i].name + ': ' + rankList[i].value + ' pkt, ';
		if (i == 9)
			break;
	}
  return rankString;
}

function sendStats(name)
{
  name = upperTrim(name);
	if (name === upperTrim(hostName))
		sendLocalizedAnnouncement([name, ': ', locStr.HOST_STATS, ': ', matchCount], null, 0xFFFF00, 'normal', 1);
	else
	{
		ps = stats[name];
		sendLocalizedAnnouncement([name, ': ', locStr.MATCHES, ': ', ps['M']
		, ', ', locStr.GOALS, ': ', ps['G'], ', ', locStr.ASSISTS, ': ', ps['A']
		, ', ', locStr.OWN_GOALS, ': ', ps['OG'], ', ', locStr.CLEAN_SHEETS, ': ', ps['CS']
		, ', ', locStr.WINS, ': ', (ps['W'] + ps['DW']), ' (', locStr.AFTER_OVERTIME, ': ', ps['DW'], ')'
		, ', ', locStr.LOSES, ': ' , (ps['L'] + ps['DL']), ' (', locStr.AFTER_OVERTIME, ': ', ps['DL'], ') – '
		, locStr.POINTS, ': ', rankingCalc(name)], null, 0xFFFF00, 'normal', 1);
	}
}

function whichTeam()
{ // filtruje graczy do grania i przyporządkowuje im drużyny
  var playersFiltered = players.filter(player => !afks.includes(player.name)); // bez nieaktywnych
  var redTeam = playersFiltered.filter(player => player.team === 1); // czerwoni
  var blueTeam = playersFiltered.filter(player => player.team === 2); // niebiescy
	var specTeam = playersFiltered.filter(player => player.team === 0); // ławka

	redCap = null;
	blueCap = null;
	specCap = null;

	if (redTeam.length !== 0)
		redCap = redTeam[0];

	if (blueTeam.length !== 0)
		blueCap = blueTeam[0];

	if (specTeam.length !== 0)
		specCap = specTeam[0];

  return [redTeam, blueTeam, specTeam];
}

function isGk()
{ // gives the mosts backward players before the first kickOff
  var min = players[0];
  min.position = {x: room.getBallPosition().x + 60}
  var max = min;

  for (var i = 0; i < players.length; i++)
	{
    if (players[i].position != null)
		{
      if (min.position.x > players[i].position.x) min = players[i];
      if (max.position.x < players[i].position.x) max = players[i];
    }
  }
  return [min, max];
}

function updateWinLoseStats(winners, losers) // onTeamVictory
{
  for (var i = 0; i < winners.length; i++)
	{
    stats[upperTrim(winners[i].name)]['W']++;
  }
  for (var i = 0; i < losers.length; i++)
	{
    stats[upperTrim(losers[i].name)]['L']++;
  }
}

function updateOvertimeWinLoseStats(winners, losers) // onTeamVictory
{
  for (var i = 0; i < winners.length; i++)
	{
    stats[upperTrim(winners[i].name)]['DW']++;
  }
  for (var i = 0; i < losers.length; i++)
	{
    stats[upperTrim(losers[i].name)]['DL']++;
  }
}

function handleMatchValid() // onGameTick
{
	if (!statsOn)
		return;
	let scores = room.getScores();
	if ((scores.time > 60 && !isMatchValid) || teamWon)
	{ // mecz trwa minutę lub ktoś już wygrał w mniej niż minutę
		isMatchValid = true;
	}
}

function whoGK()
{
	[redteam, blueTeam, specTeam] = whichTeam();
	let scores = room.getScores();
	if (scores != null)
	{
		redTeam.forEach((r) =>
		{
			let rPosx = posx[r.id].x / posx[r.id].t;
			if (rPosx < gkRPosx && posx[r.id].t > 60*9)
			{ // jeżeli x czerwonego jest mniejszy niż x cz. bramkarza i był w czerwonych dłużej niż 9 sekund
				gkRPosx = rPosx;
				gkR = r; // to ten czerwony jest cz. bramkarzem
			}
		});
		blueTeam.forEach((b) =>
		{
			let bPosx = posx[b.id].x / posx[b.id].t;
			if (bPosx > gkBPosx && posx[b.id].t > 60*9)
			{ // jeżeli x niebieskiego jest większy niż x n. bramkarza i był w niebieskich dłużej niż 9 sekund
				gkBPosx = bPosx;
				gkB = b; // to ten niebieski jest n. bramkarzem
			}
		});
		return true;
	}
	return false;
}

function findAndPrintGKs(cs)
{
	if (whoGK())
	{
		let str = [locStr.GOALKEEPERS, ': 🔴', (gkR ? gkR.name : ['(', locStr.NONE, ')']), ' ', locStr.AND, ' 🔵', (gkB ? gkB.name : ['(', locStr.NONE, ')'])];
		if (cs)
			str.push([' ', locStr.KEPT_CS_P]);
		sendLocalizedAnnouncement(str.flat(2), null, 0xFFFF33, 'normal', 1);
	}
}
function findAndPrintGKR(cs)
{
	if (whoGK())
	{
		let str = [locStr.GOALKEEPER, ': 🔴', (gkR ? gkR.name : ['(', locStr.NONE, ')'])];
		if (cs)
			str.push([' ', locStr.KEPT_CS]);
		sendLocalizedAnnouncement(str.flat(2), null, 0xFFFF33, 'normal', 1);
	}
}
function findAndPrintGKB(cs)
{
	if (whoGK())
	{
		let str = [locStr.GOALKEEPER, ': 🔵', (gkB ? gkB.name : ['(', locStr.NONE, ')'])];
		if (cs)
			str.push([' ', locStr.KEPT_CS]);
		sendLocalizedAnnouncement(str.flat(2), null, 0xFFFF33, 'normal', 1);
	}
}

function handleAfterTimeLimit() // onGameTick
{ // todo: 2x czyste konta
  scores = room.getScores();
  if (scores != null)
	{ // jeżeli gra trwa
    if (scores.timeLimit !== 0)
		{ // jeżeli czas meczu jest skończony
      if (scores.time >= scores.timeLimit)
			{ // jeżeli czas meczu przekroczył limit
				if (!isAfterTimeLimit && !teamWon)
				{ // jeżeli nie zareagowano na przekroczenie limitu czasu ani na zwycięstwo
          if (scores.red + scores.blue === 0)
					{ // Jeżeli rozpoczęła się dogrywka po remisie 0:0
						if (statsOn)
						{ // w meczu o punkty obaj bramkarze mają czyste konta
							findAndPrintGKs(true);
							stats[upperTrim(gkR.name)]['CS']++;
							stats[upperTrim(gkB.name)]['CS']++;
						}
					}
					// przypadek roztrzygnięcia wyniku przed końcem jest w onTeamVictory
        }
				isAfterTimeLimit = true; // zareagowano na przekroczenie limitu czasu
      }
    }
  }
}

/*
	****************************** Zdarzenia ******************************
*/
let gk = [null, null];
let goalScored = false;

if (!hostHidden)
{
	initPlayerStats(room.getPlayerList()[0]); // 🗿Sędzia Kalosz dostaje statystyki
	initMatchStats(upperTrim(room.getPlayerList()[0].name)); // 🗿Sędzia Kalosz dostaje statystyki
}

room.onPlayerJoin = function(player)
{
  console.log('%c' + player.name + '#' + player.id + ' wchodzi', 'color: green');
	console.log('%cauth: ' + player.auth + ' conn: ' + player.conn + ' bany: ' + (bijacze[player.name] || 0), 'color: green');
	setPlayerLanguage(player, player.flag); // ustawia język komunikatów na polski (lub, jeżeli to możliwe, język flagi)
	setPlayerGender(player, 'M');
	
	if (!kickWrongPlayer(player))
	{ // Jeżeli gracz zaraz nie zostanie wywalony
		updatePlayerList(); // aktualizacja players
		
		// Ten sam auth
		let prevAuth = authPlayers[player.auth]; // poprzedni gracz o tym samym auth
		if (prevAuth != null)
		{ // jeżeli wchodzi drugi gracz o tym samym auth
			let prevName = prevAuth.name; // poprzednia nazwa gracza
			if (room.getPlayer(prevAuth.id) != null)
				// jeżeli poprzedni gracz jest obecny
				room.kickPlayer(prevAuth.id, translate(locStr.KICK_SAME_AUTH, player), false); // wymiana
			setAuthPlayers(player, true); // aktualizacja autha
			if (prevAuth.name != player.name) // jeżeli nazwa została zmieniona
				sendLocalizedAnnouncement([prevAuth.name, ' -> ', player.name], null, 0x777700, 'normal', 0);
		}
		
		updateActiveList(); // aktualizacja activePop i pvp
		updateAdmins(); // Jeżeli nie ma adminów, najstarszy gracz dostaje admina
		[redTeam, blueTeam, specTeam] = whichTeam();
		initPlayerStats(player); // zeruje statystyki nowemu graczowi
		initMatchStats(upperTrim(player.name)); // zeruje st w 1 meczu
		initBijacze(player); // zeruje bany nowemu graczowi
		initBluzniercy(player); // zeruje liczbę przekleństw
		initMuted(player); // zeruje wyciszenie
		initAuthConn(player); // dodanie do bazy wszystkich auth i conn
		setAuthPlayers(player, true); // przypisanie nowego gracza do auth
		
		//if (player.auth === 'tavXXoj5o_rNYcNTsSLFMArjir3-oxxwJj7zay69BKI')
		//room.setPlayerAdmin(player.id, true);
		
		let sameConns = getPlayersByConn(player.conn);
		if (sameConns.length > 1)
		{
			let scNames = [];
			sameConns.forEach(e => {scNames.push(e.name);});
			// to łapie gracza dopiero wykopanego
			sendLocalizedAnnouncement(['❕ ', scNames.join(', '), ' ', locStr.MIGHT_BE_THE_SAME_PERSON], null, 0x9999AA, 'small', 0);
		}
		
		sendLocalizedAnnouncement([playerLang.get(player.id)], player.id, 0x558888, 'small', 0);
		sendLocalizedAnnouncement([locStr.WELCOME_CHECK_COMMANDS], player.id, 0x00FF44, 'normal', 2);
		sendLocalizedAnnouncement([locStr.LANGUAGE_CHANGE, ': !lang <pl/en/de/tr>'], player.id, 0x00FFFF, 'small', 0);
		if (playerLang.get(player.id) === 'pl')
			sendLocalizedAnnouncement(['Jeżeli ma być wyświetlane np. ', player.name, ' strzeliła zamiast strzelił, wpisz !płeć k'], player.id, 0x00FFFF, 'small', 0);
	}
}

room.onPlayerLeave = function(player)
{
	console.log('%c' + player.name + '#' + player.id + ' wychodzi', 'color: orange');
	if (afks.includes(player.name))
		afks.splice(afks.indexOf(player.name), 1);
	updatePlayerList();
	updateActiveList();
	updateAdmins();
	[redTeam, blueTeam, specTeam] = whichTeam();
}

room.onPlayerKicked = function(kickedPlayer, reason, ban, byPlayer)
{
	if (ban)
	{
		if (byPlayer == null)
			console.log('%c' + kickedPlayer.name + '#' + kickedPlayer.id + ' ZBANOWANY (' + reason + ')', 'color: salmon');
		else
			console.log('%c' + kickedPlayer.name + '#' + kickedPlayer.id + ' ZBANOWANY przez: '
			+ byPlayer.name + '#' + byPlayer.id + ' (' + reason + ')', 'color: salmon');
		// Banowanie nie samego siebie i nie przez sędziego
		if (byPlayer.id !== kickedPlayer.id && byPlayer.id !== 0 && byPlayer != null)
		{
			sendLocalizedAnnouncement([locStr.BAN_AFTERMATH], null, 0xFF4900, 'small', 0);
			// ilość banów przez byPlayer zwiększona o 1
			let name = upperTrim(byPlayer.name);
			bijacze[name]++;
		}

		unbanTimeout[kickedPlayer.id] = setTimeout(() => // wyczyszczenie bana po czasie
		{
			room.clearBan(kickedPlayer.id);
			console.log('🚨 Zwolniono ' + kickedPlayer.name + '#' + kickedPlayer.id + ' z więzienia');
		}, 1000 * secondsToUnban);
	}
	else
	{
		if (byPlayer == null)
			console.log('%c' + kickedPlayer.name + '#' + kickedPlayer.id + ' wykopany (' + reason + ')', 'color: salmon');
		else
			console.log('%c' + kickedPlayer.name + '#' + kickedPlayer.id + ' wykopany przez: '
			+ byPlayer.name + '#' + byPlayer.id + ' (' + reason + ')', 'color: salmon');
	}
}

room.onPlayerAdminChange = function(changedPlayer, byPlayer)
{
	// gracz changedPlayer jest brany po zmianie
	updatePlayerList();
	if (changedPlayer.admin)
	{ // uzyskuje
		if (byPlayer == null)
			console.log('%c👑' + changedPlayer.name + '#' + changedPlayer.id + ' uzyskuje admina', 'color: olive');
		else
			console.log('%c👑' + changedPlayer.name + '#' + changedPlayer.id + ' uzyskuje admina od: '
			+ byPlayer.name + '#' + byPlayer.id, 'color: olive');
	}
	else
	{ // traci
		if (byPlayer == null)
			console.log('%c' + changedPlayer.name + '#' + changedPlayer.id + ' TRACI admina', 'color: olive');
		else
			console.log('%c' + changedPlayer.name + '#' + changedPlayer.id + ' TRACI admina przez: '
			+ byPlayer.name + '#' + byPlayer.id, 'color: olive');
		//if (authConns[upperTrim(changedPlayer.name)].auth === 'tavXXoj5o_rNYcNTsSLFMArjir3-oxxwJj7zay69BKI')
			//room.setPlayerAdmin(changedPlayer.id, true);
	}
}

let posx = {};
room.onGameTick = function()
{
  resetGameInactivityCounter();
	
	updatePlayerList();
	reactToBallRadiusChange();
	handleMatchValid(); // czy mecz jest ważny
	handleAfterTimeLimit(); // czzyste konta i zd/pd
	handleInactivity();
	if (isRSRefEnabled)
	{ // kiedy sędzia odzywa się
		reactToOuts(); // aut, ck, gk
		isThrowInCorrect(); // zły aut
		isBackRequired(); // do przodu/tyłu/OK
		hasBallLeftTheLine(); // ???
		displayAddedTime(); // wyśw. dolicz. czasu
	}
  getLastTouchTheBall(); // kto strzelił/asystował
	handleAddedTime(); // ile doliczyć

	if (isAutoPossEnabled)
		displayPossAutomatically(); // posiadanie co 5 min

	// Okresy posiadania piłki (1 sekunda to 60 okresów)
	if (lastTeamTouched == Team.RED)
		redPossessionTicks++;
	else if (lastTeamTouched == Team.BLUE)
		bluePossessionTicks++;
	
	players.forEach((p) =>
	{
		if (p.position != null)
		{ // gracz w grze
			if (!(p.id in posx)) // inicjalizacja
				posx[p.id] = {x: 0, t: 0}; // położenie x, liczba klatek
			posx[p.id].x += p.position.x;
			posx[p.id].t++;
		}
	});

  tickCount++;
}

let redBasic = null;
let blueBasic = null;
room.onGameStart = function(byPlayer)
{
  if (byPlayer == null)
		console.log('%c' + 'Gra rozpoczęta', 'color: royalblue');
	else
		console.log('%c' + 'Gra rozpoczęta przez: ' + byPlayer.name + '#' + byPlayer.id, 'color: royalblue');

	resetGameInactivityCounter();
	
	let scores = room.getScores();

	teamWon = false;
	countAFK = true;
	lastPlayerTouched = null;
	assistingPlayer = null;
	[redTeam, blueTeam, specTeam] = whichTeam();
	posx = {};
	let isPvpOK = (redTeam.length >= minPlayersToStats && blueTeam.length >= minPlayersToStats);
	let isLimitOK = (scores.timeLimit >= minLimitsToStats*60 && scores.timeLimit <= maxLimitsToStats*60 && scores.scoreLimit >= minLimitsToStats && scores.scoreLimit <= maxLimitsToStats);
	statsOn = (isPvpOK && isLimitOK && !isBadMap);
	isSzpakoski = statsOn; // rozbudowane komentarze tylko przy wł. statystykach
	isMatchValid = false;
	isChoosingTime = false;
	
	gkR = null;
	gkB = null;
	gkRPosx = 0;
	gkBPosx = 0;

	if (statsOn)
	{
		matchCount++;
		// ilość meczów +1 dla graczy w składzie podstawowym
		redTeam.forEach(function(r)
		{
			let name = upperTrim(r.name);
			initMatchStats(name);
			stats[name]['M']++;
			matchStats[name]['M']++;
		});
		blueTeam.forEach(function(b)
		{
			let name = upperTrim(b.name);
			initMatchStats(name);
			stats[name]['M']++;
			matchStats[name]['M']++;
		});

		sendLocalizedAnnouncement(['#', matchCount], null, 0xFFFF00, 'small', 0);
	}
	else if (!isPvpOK)
	{
		sendLocalizedAnnouncement(['(', locStr.STATS_VALID_IF_PLAYERS, ')'], null, 0xFFDD00, 'small', 0, [minPlayersToStats]);
	}
	else if (!isLimitOK)
	{
		sendLocalizedAnnouncement(['(', locStr.STATS_VALID_IF_LIMITS, ')'], null, 0xFFDD00, 'small', 0, [minLimitsToStats, maxLimitsToStats]);
	}

	reactToBallRadiusChange();
	lastTeamTouched = 0;
	lineCrossedPlayers = [{name: 'temp', times: 0}];
  lastScores = room.getScores().red + room.getScores().blue;
  timeOutside = 0;
  isTimeAddedShown = false;
	isInactiveShown = {};
	isAutoPossShown = false;
  ballYPosition = 0;
	redPossessionTicks = 0;
	bluePossessionTicks = 0;

	whoScoredList = [];

	if (!isNaN(ballColor))
		room.setDiscProperties(0, {color: ballColor}); // piłka zmienia kolor na ustalony

	setTimeout(startRecording, 500);

	tickCount = 0;
}

room.onGameStop = function(byPlayer)
{ // todo: statystyki utracone
	if (byPlayer == null)
		console.log('%c' + 'Gra przerwana', 'color: royalblue');
	else
		console.log('%c' + 'Gra przerwana przez: ' + byPlayer.name + '#' + byPlayer.id, 'color: royalblue');

	isPaused = false;
	isChoosingTime = true;
	activities = {};

	if (statsOn)
	{
		if (!isMatchValid && !teamWon)
		{ // jeżeli mecz trwał za krótko
			// anulowanie zdobytych statystyk w tym meczu WSZYSTKIM graczom
			Object.keys(stats).forEach((s) =>
			{
				stats[s]['M'] -= matchStats[s]['M'];
				stats[s]['G'] -= matchStats[s]['G'];
				stats[s]['A'] -= matchStats[s]['A'];
				stats[s]['OG'] -= matchStats[s]['OG'];
			});

			Object.keys(matchStats).forEach((s) =>
			{
				matchStats[s] = {M:0, G:0, A:0, OG:0};
			});

			sendLocalizedAnnouncement(['⚠ ', locStr.MATCH_CANCELLED], null, 0xFFAA00, 'normal', 1, [matchCount]);
			matchCount--;
		}
		else if (!teamWon)
		{ // bez Z/P
			sendLocalizedAnnouncement(['⚠ ', locStr.WL_CANCELLED], null, 0xFFAA00, 'normal', 1);
		}
	}

	/* posx.forEach((p) =>
	{
		p = p/tickCount;
	});*/

  kickOff = false;
  isAfterTimeLimit = false;

	printScorers();
	unmuteAll(); // odcisza wszystkich

	setTimeout(stopRecording, 500);
}

room.onGamePause = function(byPlayer)
{
  if (byPlayer == null)
		console.log('%c' + '⏸Gra zatrzymana', 'color: royalblue');
	else
		console.log('%c' + '⏸Gra zatrzywana przez: ' + byPlayer.name + '#' + byPlayer.id, 'color: royalblue');
	isPaused = true;
	isChoosingTime = true;
}

room.onGameUnpause = function(byPlayer)
{
  if (byPlayer == null)
		console.log('%c' + '⏯Gra wznowiona', 'color: royalblue');
	else
		console.log('%c' + '⏯Gra wznowiona przez: ' + byPlayer.name + '#' + byPlayer.id, 'color: royalblue');
	
	resetGameInactivityCounter();
	
	isPaused = false;
	isChoosingTime = false;
}

// Zmiana drużyny
room.onPlayerTeamChange = function(changedPlayer, byPlayer)
{
  if (byPlayer == null)
		console.log('%c' + changedPlayer.name + '#' + changedPlayer.id + ' zmienia stronę', 'color: grey');
	else
		console.log('%c' + changedPlayer.name + '#' + changedPlayer.id + ' zmienia stronę przez: '
		+ byPlayer.name + '#' + byPlayer.id, 'color: grey');

	updatePlayerList();
	// Sędzia i nieaktywni nie ruszają się
	if (changedPlayer.id === 0 || afks.includes(changedPlayer.name))
		room.setPlayerTeam(changedPlayer.id, 0);
	posx[changedPlayer.id] = {x:0, t:0};
	[redTeam, blueTeam, specTeam] = whichTeam();
}

room.onPlayerBallKick = function(byPlayer)
{ // KOPNIĘCIE PIŁKI
  let ballPosition = room.getBallPosition();
  if (lastPlayerTouched != null && byPlayer.id != lastPlayerTouched.id)
  { // jeżeli ostatni gracz istnieje i gracz nie jest ostatnim graczem (nie asystuje samemu sobie)
		if (lastTeamTouched == byPlayer.team) // jeżeli ostatnia drużyna to drużyna gracza
			assistingPlayer = lastPlayerTouched;
		else assistingPlayer = null; // przeciwnik nie asystuje
  }
  previousPlayerTouched = lastPlayerTouched;
  lastPlayerTouched = byPlayer;
  lastTeamTouched = byPlayer.team;

	// RS
  if (isBallOutsideStadium)
      getPlayersNotWithinLine();
  if (isBallOutsideStadium && ballPosition.y < 0)
      isBallKickedOutside = true;
	else if (isBallOutsideStadium && ballPosition.y > 0)
      isBallKickedOutside = true;
	else isBallKickedOutside = false;
}

let szpakArrayM =
[
	['Gol! Strzelił ^0', '. Asystował mu ^0', '^0 strzela samobója']
	,['^0 pokazuje, jak to się robi', ' wykorzystując dośrodkowanie ^1', 'Nieudana interwencja ^1']
	,['^0 zdobywa bramkę', ' po bezbłędnym podaniu ^1', 'Strzał ^1 został skierowany do niewłaściwej bramki']
	,['I mamy bramkę strzeloną przez ^2', '. Asysta ^1', 'Co podkusiło ^2, żeby skierować piłkę akurat w tę stronę?']
	,['Piłka w siatce po strzale ^1', '. Doskonałe dogranie ^1', 'Piłka odbija się od ^1 i trafia do jego własnej bramki']
	,['^0 omal nie spudłował', ' po wrzutce ^1', 'Bramka strzelona przez ^2... Ale strzelcowi nie wypada się z niej cieszyć']
	,['Piłka w bramce po kapitalnym woleju ^1', ', którego odnalazł ^0', 'Piłka ewidentnie nie słucha się dziś ^1']
	,['^0 strzelił gola po indywidualnej akcji całej drużyny', ', a w szczególności ^1', 'Oj, to nie nie jest dzień ^1']
	,['^0 kopnął prosto piłkę i wpadło', '. Asysta ^1', '^0 uznał, że było za łatwo']
	,['A tymczasem mamy bramkę ^1', '! Przytomne zachowanie po odbiorze od ^1', '^0 pokonał własnego bramkarza']
	,['Bramkarz kapituluje po technicznym strzale ^1', '. Dogrywał ^0', 'Napastnik rywali wyręczony przez ^2']
	,['Dla ^1 to była formalność', ', zwłaszcza że przeciwnicy zapomnieli o kryciu ^1', 'Ajj, jednak jest bramka, fatalny błąd ^1!']
];

let szpakArrayK =
[
	['Gol! Strzeliła ^0', '. Asystowała mu ^0', '^0 strzela samobója']
	,['^0 pokazuje, jak to się robi', ' wykorzystując dośrodkowanie ^1', 'Nieudana interwencja ^1']
	,['^0 zdobywa bramkę', ' po bezbłędnym podaniu ^1', 'Strzał ^1 został skierowany do niewłaściwej bramki']
	,['I mamy bramkę strzeloną przez ^2', '. Asysta ^1', 'Co podkusiło ^2, żeby skierować piłkę akurat w tę stronę?']
	,['Piłka w siatce po strzale ^1', '. Doskonałe dogranie ^1', 'Piłka odbija się od ^1 i trafia do jej własnej bramki']
	,['^0 omal nie spudłowała', ' po wrzutce ^1', 'Bramka strzelona przez ^2... Ale strzelcowi nie wypada się z niej cieszyć']
	,['Piłka w bramce po kapitalnym woleju ^1', ', którego odnalazła ^0', 'Piłka ewidentnie nie słucha się dziś ^1']
	,['^0 strzeliła gola po indywidualnej akcji całej drużyny', ', a w szczególności ^1', 'Oj, to nie nie jest dzień ^1']
	,['^0 kopnęła prosto piłkę i wpadło', '. Asysta ^1', '^0 uznała, że było za łatwo']
	,['A tymczasem mamy bramkę ^1', '! Przytomne zachowanie po odbiorze od ^1', '^0 pokonała własnego bramkarza']
	,['Bramkarz kapituluje po technicznym strzale ^1', '. Dogrywała ^0', 'Napastnik rywali wyręczony przez ^2']
	,['Dla ^1 to była formalność', ', zwłaszcza że przeciwnicy zapomnieli o kryciu ^1', 'Ajj, jednak jest bramka, fatalny błąd ^1!']
];

function deklinacja(str, nazwa)
{
	return str.format([nazwa, dopelniaczNazwy(nazwa), biernikNazwy(nazwa)]);
}
// jeżeli samobój
let isOwnGoal = (team, player) => team !== player.team ? locStr.OG : '';
room.onTeamGoal = function(team)
{ // Kto i kiedy strzelił
    countAFK = false;
	let scores = room.getScores();

	let time = room.getScores().time;
    let m = Math.trunc(time / 60);
	let s = Math.trunc(time % 60);
    time = m + ':' + String(s).padStart(2, '0'); // m:ss

	let rnd = randInt(0, szpakArrayM.length-1);

	if (lastPlayerTouched != null)
	{
		let ownGoal = isOwnGoal(team, lastPlayerTouched);
		let scorer = '';
		let assist = '';
		let simpleAssist = '';
		// asysta
		if (ownGoal === '' && assistingPlayer != null && assistingPlayer.id != lastPlayerTouched.id)
		{
			if (isSzpakoski)
			{
				if (playerGender.get(assistingPlayer.id) === 'K')
					assist = deklinacja(szpakArrayK[rnd][1], assistingPlayer.name);
				else
					assist = deklinacja(szpakArrayM[rnd][1], assistingPlayer.name);
			}
			else
				assist = ' (' + assistingPlayer.name + ') ';
			simpleAssist = ' (' + assistingPlayer.name + ') ';
			if (statsOn)
			{
				initMatchStats(upperTrim(assistingPlayer.name));
				stats[upperTrim(assistingPlayer.name)]['A']++;
				matchStats[upperTrim(assistingPlayer.name)]['A']++;
			}
		}

		if (ownGoal === '')
		{
			if (isSzpakoski)
			{
				if (playerGender.get(lastPlayerTouched.id) === 'K')
					scorer = deklinacja(szpakArrayK[rnd][0], lastPlayerTouched.name);
				else
					scorer = deklinacja(szpakArrayM[rnd][0], lastPlayerTouched.name);
			}
			else
				scorer = lastPlayerTouched.name;
			if (statsOn)
			{
				initMatchStats(upperTrim(lastPlayerTouched.name));
				stats[upperTrim(lastPlayerTouched.name)]['G']++;
				matchStats[upperTrim(lastPlayerTouched.name)]['G']++;
			}

		}
		else
		{
			if (isSzpakoski)
			{
				if (playerGender.get(lastPlayerTouched.id) === 'K')
					scorer = deklinacja(szpakArrayK[rnd][2], lastPlayerTouched.name);
				else
					scorer = deklinacja(szpakArrayM[rnd][2], lastPlayerTouched.name);
			}
			else
				scorer = lastPlayerTouched.name;
			if (statsOn)
			{
				initMatchStats(upperTrim(lastPlayerTouched.name));
				stats[upperTrim(lastPlayerTouched.name)]['OG']++;
				matchStats[upperTrim(lastPlayerTouched.name)]['OG']++;
			}
		}
		let dispOG = isSzpakoski ? '' : ownGoal;

		sendLocalizedAnnouncement(['⚽', teamIcon(team), ' ', time, ' ', scorer,
		assist, ' ', dispOG], null, 0xFFFF00, 'normal', 1);

		whoScoredList.push(teamIcon(team) + ' ' + time + ' ' + lastPlayerTouched.name + simpleAssist + (ownGoal!=''?ownGoal.pl:''));

		// Zmiana wyglądu i zachowania kulki gracza
		room.setPlayerDiscProperties(lastPlayerTouched.id, {bCoeff: 6});
	}
	else
	{
		sendLocalizedAnnouncement(['⚽', teamIcon(team), ' ', time, ' '], null, 0xFFFF00, 'normal', 1);
	}
	
	if (!teamWon && (scores.red === scores.scoreLimit || scores.blue === scores.scoreLimit))
	{ // jeżeli nie zareagowano na zwycięstwo i padła zwycięzka bramka
		if (statsOn)
		{
			// Czyste konta w podstawowym czasie
			if (statsOn && scores.blue === 0 && !isAfterTimeLimit)
			{
				findAndPrintGKR(true);
				stats[upperTrim(gkR.name)]['CS']++;

			}
			if (statsOn && scores.red === 0 && !isAfterTimeLimit)
			{
				findAndPrintGKB(true);
				stats[upperTrim(gkB.name)]['CS']++;
			}
			
			// zwycięstwa i porażki
			if (isAfterTimeLimit)
			{ // jeżeli trwała dogrywka
				if (scores.red > scores.blue)
				{
					updateOvertimeWinLoseStats(redTeam, blueTeam);
				}
				else
				{
					updateOvertimeWinLoseStats(blueTeam, redTeam);
				}
			}
			else
			{ // jeżeli nie było dogrywki
				if (scores.red > scores.blue)
				{
					updateWinLoseStats(redTeam, blueTeam);
				}
				else
				{
					updateWinLoseStats(blueTeam, redTeam);
				}
			}
		}
		
		console.log(scores.red + ':' + scores.blue);
		teamWon = true;
	}
}

room.onPositionsReset = function()
{
	reactToBallRadiusChange();
	if (!isNaN(ballColor))
		room.setDiscProperties(0, {color: ballColor}); // piłka zmienia kolor na ustalony
	lastPlayerTouched = null;
	assistingPlayer = null;
	countAFK = true;
}

room.onTeamVictory = function(scores)
{ // kiedy drużyna dowiezie prowadzenie do końca
	if (statsOn)
	{
		// Czyste konta w dowiezionym wyniku w podstawowym czasie
		if (scores.blue === 0)
		{
			findAndPrintGKR(true);
			stats[upperTrim(gkR.name)]['CS']++;
		}
		if (scores.red === 0)
		{
			findAndPrintGKB(true);
			stats[upperTrim(gkB.name)]['CS']++;
		}
	}
	console.log(scores.red + ':' + scores.blue);
	teamWon = true; // zareagowano na zwycięstwo, nie wchodzić w handleAfterTimeLimit
}

function handleInactivity() // onGameTick
{ // nieaktywni: gracze będą wyrzucani po dłuższej nieaktywności
	if (countAFK && (redTeam.length + blueTeam.length) > 1)
	{ // jeżeli gra więcej niż 1 gracz
		redTeam.forEach((r) =>
		{
			if (!activities[r.id])
				activities[r.id] = 0;
			activities[r.id]++;
		});
		blueTeam.forEach((b) =>
		{
			if (!activities[b.id])
				activities[b.id] = 0;
			activities[b.id]++;
		});
	}
	Object.keys(activities).forEach((a) =>
	{
		if (activities[a] >= 60 * (2/3 * afkLimit))
		{ // jeżeli nieaktywność przekroczy 2/3 limitu
			if (!isInactiveShown[a]) // !undefined zwraca true
			{ // jeżeli nie wyświetlono ostrzeżenia
				sendLocalizedAnnouncement(['⏳ ', room.getPlayer(a).name, ' ', locStr.AFK_KICK_INCOMING_IN_SECS]
				, null, 0xFFDB60, 'bold', 2, [Math.floor(afkLimit / 3)]);
				isInactiveShown[a] = true; // wyświetlono dla danego id
			}
		}
		else
		{
			isInactiveShown[a] = false; // można wyświetlać dla danego id
		}
		if (activities[a] >= 60 * afkLimit)
		{ // jeżeli nieaktywność przekroczy limit
			activities[a] = 0; // resetowanie nieaktywności dla danego id
			room.kickPlayer(a, '⌛ ' + translate(locStr.KICK_AFK, room.getPlayer(a)), false);
			
			setTimeout(() =>
			{
				//room.pauseGame(true);
				topToRed();
				topToBlue();
			}, 10);
		}
	});
}
room.onPlayerActivity = function (player)
{
    activities[player.id] = 0;
}

room.onPlayerChat = function(player, message)
{
	console.log(player.name + '#' + player.id + ': ' + message);

	let spacePos = message.search(' ');
	// Komenda do spacji - !k 0 - Argument po spacji
	//                     ^^ ^
	// Potencjalna komenda i argument
	let command = message.substr(0, spacePos !== -1 ? spacePos : message.length);
	let arg = message.substr(command.length + 1, message.length);

	// Wulgaryzmy
	let name = upperTrim(player.name);
	let lw = liczbaWulgaryzmow(message);
	if (lw > 0)
	{
		bluzniercy[name] += lw;
	}

	// komenda ze słownika zamieniona na WIELKIE LITERY
	command = command.toUpperCase();
	
	let cmdOutcome = parseCmd(player, command, arg);
	if (cmdOutcome != null)
		// jeżeli komenda została wykonana
		return cmdOutcome; // czy komenda ma być widoczna
	else
	{ // inaczej jeżeli nie wiadomość nie zaczyna się na !
		// todo: wybieranie
		let playerNames = [];
		players.forEach((p) =>
		{
			playerNames.push(p.name);
		});
		let namesAutocompleted = autocomplete(message, playerNames);
		let gotIds = [];
		namesAutocompleted.forEach((n) =>
		{
			gotIds.push(getIdByPlayerName(n));
		});
		//console.log(namesAutocompleted + ' ' + gotIds); // działa
	}
}

// Znajdowanie komend różnych kategorii
function getNormalCmds()
{
	return cmdArray.filter(c => !c.onlyAdmin && !c.full && !c.hidden);
}
function getAdminCmds()
{
	return cmdArray.filter(c => c.onlyAdmin && !c.full && !c.hidden);
}
function getFullCmds()
{
	return cmdArray.filter(c => !c.onlyAdmin && c.full && !c.hidden);
}
function getFullAdminCmds()
{
	return cmdArray.filter(c => c.onlyAdmin && c.full && !c.hidden);
}
function getHiddenCmds()
{
	return cmdArray.filter(c => !c.onlyAdmin && c.hidden);
}
function getHiddenAdminCmds()
{
	return cmdArray.filter(c => c.onlyAdmin && c.hidden);
}
function getCmdNames(cmdGroup)
{
	let namesArray = [];
	cmdGroup.forEach(c =>
	{
		namesArray.push(c.cmd);
	});
	return namesArray;
}

function findCmd(command)
{ // Szukanie komendy po nazwie
	return cmdArray.find(c => c.cmd === command);
}

function parseCmd(byPlayer, command, arg)
{
	let c = null;
	if (command.trim() === '!') // ! to !help
	{ // jeżeli wiadomość to !
		c = findCmd('!HELP');
		c.func(byPlayer, arg);
		return !c.hideInChat;
	}
	else if (command[0] === '!')
	{ // inaczej jeżeli to komenda (zaczyna się na !)
		if (getCmdNames(cmdArray).includes(command))
		{ // jeżeli to dokładne dopasowanie
			c = findCmd(command)
			if (!c.onlyAdmin || byPlayer.admin)
			{ // jeżeli to komenda nie dla admina lub gracz to admin
				c.func(byPlayer, arg);
				return !c.hideInChat;
			}
			else
					sendLocalizedAnnouncement(['⛔', locStr.YOU_HAVE_NO_POWER_HERE], byPlayer.id, 0xFF3300, 'normal', 1);
		}
		else
		{ // inaczej jeżeli to nie jest dokładne dopasowanie
			let unhiddenCmdNames = getCmdNames(getNormalCmds().concat(getAdminCmds()));
			let unhiddenCmdNamesAutocompleted = autocomplete(command, unhiddenCmdNames);
			if (unhiddenCmdNamesAutocompleted.length > 0)
			{ // jeżeli istnieje dopasowanie do komendy
				if (unhiddenCmdNamesAutocompleted.length === 1)
				{ // jeżeli pasuje jedna komenda
					c = findCmd(unhiddenCmdNamesAutocompleted[0])
					if (!c.onlyAdmin || byPlayer.admin)
					{ // jeżeli to komenda nie dla admina lub gracz to admin
						c.func(byPlayer, arg);
						return !c.hideInChat;
					}
					else
						sendLocalizedAnnouncement(['⛔', locStr.YOU_HAVE_NO_POWER_HERE], byPlayer.id, 0xFF3300, 'normal', 1);
				}
				else
				{ // inaczej jeżeli pasuje wiele komend
					let str = [locStr.DID_YOU_MEAN, ' '];
					for (let i = 0; i < unhiddenCmdNamesAutocompleted.length; i++)
					{
						str.push(unhiddenCmdNamesAutocompleted[i]);
						if (i > 20 || i === unhiddenCmdNamesAutocompleted.length-1)
							break; // nie dopisywać przecinka na koniec
						str.push(', ');
					}
					sendLocalizedAnnouncement(str, byPlayer.id, 0xFFCC00, 'normal', 1); // wypisanie propozycji
				}
			}
			else
			{	// inaczej jeżeli to !cokolwiek_innego
				c = findCmd('!HELP'); // to traktować jak !help
				c.func(byPlayer, arg);
				return !c.hideInChat;
			}
		}
	}
	// jeżeli tu doszło, tzn. że wiadomość nie zaczyna się na !
	return null;
}

let classicStadiums = ['Classic', 'Easy', 'Small', 'Big', 'Rounded', 'Hockey', 'BigHockey', 'Big Easy', 'Big Rounded', 'Huge'];
room.onStadiumChange = function(newStadiumName, byPlayer)
{
  if (byPlayer == null)
		console.log('%c' + '🌐Stadion zmieniony na: ' + newStadiumName, 'color: fuchsia');
	else
		console.log('%c' + '🌐Stadion zmieniony na: ' + newStadiumName + ' przez: ' + byPlayer.name, 'color: fuchsia');

	isRSRefEnabled = false;
	isBadMap = false;
	
	let nameF = removeDiacritics(upperTrim(newStadiumName));
	if (nameF.includes('REAL SOCCER'))
	{
		// powołano sędziego
		isRSRefEnabled = true;
		sendLocalizedAnnouncement([locStr.REF_CALLED_UP], null, 0xFFFF00, 'normal', 1);
		isAutoPossEnabled = true;
		sendLocalizedAnnouncement([locStr.AUTO_BALL_POSS_DISPLAY, (isAutoPossEnabled ? locStr.ENABLED : locStr.DISABLED)], null, 0xFFFF00, 'normal', 1);
	}
	else if (nameF.includes('SPACEWRESTLING'))
	{
		sendLocalizedAnnouncement([locStr.HINT_SPACEWRESTLING], null, 0x00FF77, 'normal', 1);
	}
	else if (nameF.includes('8BALL') || nameF.includes('8 BALL'))
	{
		isBadMap = true;
		sendLocalizedAnnouncement(['(', locStr._8BALL_NOT_SUPPORTED, ')'] , null, 0xFFDD00, 'normal', 0);
	}
}

room.onRoomLink = function(url)
{
	url = url;
	console.log('Url: ' + url);
}

// Kolory klubowe
let kluby =
{
	'PIAST GLIWICE': [0, 0xFFE0E0, [0x1100FF]],
	'LEGIA WARSZAWA': [90, 0xFFFFFF, [0x00BB60, 0x000000]],
	'LECHIA GDAŃSK': [90, 0x000000, [0x2F9C0E, 0xFFFFFF, 0x2F9C0E]],
	'CRACOVIA': [0, 0x000000, [0xFFF5F5, 0xFF0000, 0xFFFFFF]],
	'JAGIELLONIA BIAŁYSTOK': [90, 0x000000, [0xFF0303, 0xFFFF05, 0xFF0303]],
	'ZAGŁĘBIE LUBIN': [90, 0xFFFFFF, [0xFF5600, 0xFF6900, 0xFF5600]],
	'POGOŃ SZCZECIN': [0, 0xFFFFFF, [0x002345, 0x87140C, 0x002345]],
	'LECH POZNAŃ': [90, 0x000000, [0x2B00FF, 0xFFFFFF]],
	'WISŁA KRAKÓW': [90, 0x000000, [0xCC0000, 0xFFFFFF]],
	'KORONA KIELCE': [0, 0x000000, [0xFFFF0F, 0xFC0000, 0xDEFF0A]],
	'GÓRNIK ZABRZE': [90, 0x0000AA, [0xFF1111, 0xFFFFFF]],
	'ŚLĄSK WROCŁAW': [90, 0xF7FF00, [0x005000, 0x008000]],
	'ARKA GDYNIA': [90, 0x000000, [0xFFFF00, 0x0000FF]],
	'WISŁA PŁOCK': [90, 0x000000, [0x0000FF, 0xFFFFFF, 0x0000FF]],
	'RAKÓW CZĘSTOCHOWA': [45, 0xFFFFFF, [0xFF0000, 0x0000FF, 0xFF0000]],
	'ŁKS ŁÓDŹ': [90, 0x000000, [0xFFFFFF, 0xFF0000, 0xFFFFFF]],

	'BRUK-BET TERMALICA NIECIECZA': [60, 0xFFFFFF, [0xFF9538]],
	'CHOJNICZANKA CHOJNICE': [0, 0x000000, [0xFF0000, 0xFFFF00]],
	'CHROBRY GŁOGÓW': [90, 0xFFFFFF, [0xFF9A17, 0x000000]],
	'GKS JASTRZĘBIE': [90, 0xFFFF00, [0x000000, 0x000000, 0x009000]],
	'GKS BEŁCHATÓW': [90, 0xFFFFFF, [0x008544, 0x000000]],
	'GKS TYCHY': [90, 0xFFFFFF, [0x00AA40, 0x000000, 0xFF0000]],
	'MIEDŹ LEGNICA': [0, 0xFF0000, [0x0000FF]],
	'ODRA OPOLE': [90, 0xFFFFFF, [0xFF0000, 0x0000FF, 0x0000FF]],
	'OLIMPIA GRUDZIĄDZ': [0, 0x000000, [0x007A00, 0xFFFFFF, 0x007A00]],
	'PODBESKIDZIE BIELSKO-BIAŁA': [90, 0xFF0000, [0xFFFFFF, 0x0000FF]],
	'PUSZCZA NIEPOŁOMICE': [0, 0x000000, [0xDDFFDD]],
	'RADOMIAK RADOM': [90, 0x000000, [0x009400, 0xFFFFFF]],
	'SANDECJA NOWY SĄCZ': [0, 0xA329C2, [0xFFFFFF, 0x000000, 0xFFFFFF]],
	'WARTA POZNAŃ': [60, 0x00A800, [0xEEFFEE]],
	'STAL MIELEC': [90, 0x110000, [0xFFFFFF, 0x0022FF]],
	'STOMIL OLSZTYN': [90, 0x000033, [0x00DDFF, 0xFFFFFF]],
	'WIGRY SUWAŁKI': [0, 0xFFAA00, [0xFFFFFF, 0x0000FF, 0xFFFFFF]],
	'ZAGŁĘBIE SOSNOWIEC': [0, 0xBBBBBB, [0xFFFFFF]],

	'BŁĘKITNI STARGARD': [0, 0xFFFFFF, [0x00DDFF]],
	'BYTOVIA BYTÓW': [90, 0x330000, [0x000000, 0xFFFFFF, 0xFF0000]],
	'ELANA TORUŃ': [0, 0x0022FF, [0xFFFF00]],
	'GARBARNIA KRAKÓW': [0, 0x964B00, [0xFFFFFF]],
	'GKS KATOWICE': [90, 0x00BB00, [0xFFFF00, 0x000000]],
	'GÓRNIK ŁĘCZNA': [0, 0x000000, [0x00BB30, 0x008030, 0x00BB30]],
	'GÓRNIK POLKOWICE': [0, 0x000000, [0x009933]],
	'GRYF WEJHEROWO': [90, 0xAADDFF, [0xFFFF00, 0x000000]],
	'LECH II POZNAŃ': [90, 0x000000, [0x2B00FF, 0xFFFFFF]],
	'LEGIONOVIA LEGIONOWO': [90, 0xFFFFFF, [0xFFFF00, 0xFF0000]],
	'OLIMPIA ELBLĄG': [90, 0x000000, [0xFFFF00, 0xFFFFFF, 0x0000FF]],
	'POGOŃ SIEDLCE': [0, 0xFFFFFF, [0x0000FE]],
	'RESOVIA RZESZÓW': [0, 0x220000, [0xFFF5F5, 0xF00000, 0xFFFFFF]],
	'SKRA CZĘSTOCHOWA': [90, 0xFF0000, [0x0000FF, 0x0000FF, 0xFFFFFF]],
	'STAL RZESZÓW': [0, 0x333333, [0xFFFFFF, 0x0000FF, 0xFFFFFF]],
	'STAL STALOWA WOLA': [90, 0xFFFFFF, [0x009900, 0x000000]],
	'WIDZEW ŁÓDŹ': [0, 0xFFFFFF, [0xEE0000]],
	'ZNICZ PRUSZKÓW': [90, 0x000010, [0xFFDD00, 0xFF0000]],

	'RUCH CHORZÓW': [14, 0xFFFFFF, [0x0000FF]],

	'BORUTA ZGIERZ': [90, 0x999999, [0x000000, 0xFFFFFF]]
};
let skluby =
{
	'PIA': 'PIAST GLIWICE',
	'LEG': 'LEGIA WARSZAWA',
	'LGD': 'LECHIA GDAŃSK',
	'CRA': 'CRACOVIA',
	'JAG': 'JAGIELLONIA BIAŁYSTOK',
	'ZLU': 'ZAGŁĘBIE LUBIN',
	'POG': 'POGOŃ SZCZECIN',
	'LPO': 'LECH POZNAŃ',
	'WKR': 'WISŁA KRAKÓW',
	'KOR': 'KORONA KIELCE',
	'GZA': 'GÓRNIK ZABRZE',
	'ŚLĄ': 'ŚLĄSK WROCŁAW',
	'ARK': 'ARKA GDYNIA',
	'WPŁ': 'WISŁA PŁOCK',
	'RAK': 'RAKÓW CZĘSTOCHOWA',
	'ŁKS': 'ŁKS ŁÓDŹ',

	'BBT': 'BRUK-BET TERMALICA NIECIECZA',
	'CCH': 'CHOJNICZANKA CHOJNICE',
	'CHG': 'CHROBRY GŁOGÓW',
	'JAS': 'GKS JASTRZĘBIE',
	'BEŁ': 'GKS BEŁCHATÓW',
	'TYC': 'GKS TYCHY',
	'MIE': 'MIEDŹ LEGNICA',
	'ODO': 'ODRA OPOLE',
	'OGR': 'OLIMPIA GRUDZIĄDZ',
	'POD': 'PODBESKIDZIE BIELSKO-BIAŁA',
	'PNI': 'PUSZCZA NIEPOŁOMICE',
	'RAD': 'RADOMIAK RADOM',
	'SNS': 'SANDECJA NOWY SĄCZ',
	'SMI': 'STAL MIELEC',
	'STO': 'STOMIL OLSZTYN',
	'WAR': 'WARTA POZNAŃ',
	'WIG': 'WIGRY SUWAŁKI',
	'ZSO': 'ZAGŁĘBIE SOSNOWIEC',

	'BŁS': 'BŁĘKITNI STARGARD',
	'BYT': 'BYTOVIA BYTÓW',
	'ELA': 'ELANA TORUŃ',
	'GAR': 'GARBARNIA KRAKÓW',
	'KAT': 'GKS KATOWICE',
	'GKŁ': 'GÓRNIK ŁĘCZNA',
	'GPO': 'GÓRNIK POLKOWICE',
	'GRW': 'GRYF WEJHEROWO',
	'LGO': 'LEGIONOVIA LEGIONOWO',
	'ELB': 'OLIMPIA ELBLĄG',
	'PSI': 'POGOŃ SIEDLCE',
	'RES': 'RESOVIA RZESZÓW',
	'SKC': 'SKRA CZĘSTOCHOWA',
	'STR': 'STAL RZESZÓW',
	'SSW': 'STAL STALOWA WOLA',
	'WID': 'WIDZEW ŁÓDŹ',
	'ZNI': 'ZNICZ PRUSZKÓW',

	'RCH': 'RUCH CHORZÓW',

	'BZG': 'BORUTA ZGIERZ'
};

function giveEmergencyAdmin()
{ // admina dostanie najstarszy aktywny śmiertelnik
	let mortals = getPlayersByAdmin(false);
	if (mortals.length === 0)
		return false; // nie ma nikogo - nie udało się
	mortals.forEach(p =>
	{
		if (!afks.includes(p.name))
		{ // jeżeli śmiertelnik jest aktywny
			room.setPlayerAdmin(p.id, true); // to dostaje admina
			return true; // udało się
		}
	});
	// jeżeli są sami nieaktywni, to najstarszy śmiertelnik dostaje admina
	room.setPlayerAdmin(mortals[0].id, true);
	return true; // udało się, przynajmniej na razie
}

// Czasomierze globalne
let timeToWarning = 45; // sekundy do ostrzeżenia
let timeToAdmin = 75; // sekundy do nowego admina
let isWarningDisplayed = false; // czy wyświetlono ostrzeżenie
let gameInactivityCounter = 0; // licznik nieaktywności zwiększany co sekundę
const GAME_INACTIVITY_INTERVAL = setInterval(() =>
{ // co 1 sekundę
	if (population > 1)
	{ // jeżeli są 2 osoby lub więcej
		gameInactivityCounter++; // to zwiększ licznik nieaktywności
	}
	if (gameInactivityCounter >= timeToWarning && !isWarningDisplayed)
	{ // jeżeli pokój umiera i nie wyświetlono ostrzeżenia
		sendLocalizedAnnouncement([locStr.NO_GAME_ACTIVITY_NEW_ADMIN], null, 0xFFFF00, 'bold', 2
		, [timeToAdmin-gameInactivityCounter]);
		isWarningDisplayed = true; // już wyświetlono
	}
	if (gameInactivityCounter >= timeToAdmin)
	{ // jeżeli pokój umarł
		if (giveEmergencyAdmin())
		{ // jeżeli udało się dać admina
			sendLocalizedAnnouncement([locStr.EMERGENCY_ADMIN_GIVEN], null, 0xFFFF00, 'bold', 2)
			gameInactivityCounter = 0; // reset
			isWarningDisplayed = false; // nast. razem wyświetlić ostrzeżenie
		} // jeżeli nie, to za 1s następna próba
	}
}, 1000);

function resetGameInactivityCounter()
{
	gameInactivityCounter = 0;
	if (isWarningDisplayed)
	{
		sendLocalizedAnnouncement([locStr.NEVER_MIND], null, 0x999999, 'small', 0);
		isWarningDisplayed = false;
	}
}

window.onbeforeunload = function(e)
{ // zabezpieczenie przed przypadkowym zamknięciem
  e = e || window.event;
  // Dla IE i Firefox przed wersją 4
  if (e)
    e.returnValue = 'Sure?';
  return 'Sure?'; // dla Safari
};
