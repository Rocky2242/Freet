/* See https://repl.it/repls/ExemplaryFreeSite */

var currentToken = "";

const jctBase = "cutibeau2ic";
const ssoToken = "AQIC5wM2LY4SfczEZE2fGevb0t17TAm-G9kAMvxhtxL4oGU.*AAJTSQACMDIAAlNLABQtMTkwNjA5MTA1OTI5NDc0NTI1MgACUzEAAjQ4*";

function tokenFormat(str) {
    /*
     *  1. Get MD5 Of Str
     *  2. Base64 Encode MD5 hash
     *  3. Replace the following characters in theBase64 encoded MD5 hash
     *     + => -
     *     / => _
     *     = =>         [nothing]
     *     \n =>        [nothing] 
     *     \r =>        [nothing]
     */
    return md5.base64(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
        .replace(/[\n\r]/g,'');
}

function generateJct(st, pxe) {
    return tokenFormat(jctBase + st + pxe).trim();
}

function generatePxe() {
    return (Math.round((new Date().getTime()) / 1000) + 900)
}

function generateSt() {
    return tokenFormat(ssoToken);
}

function generateToken() {
    var st  = generateSt();
    var pxe = generatePxe();
    var jct = generateJct(st, pxe);

    return `?jct=${jct}&pxe=${pxe}&st=${st}`;
}

function updateToken() {
    currentToken = generateToken();
}

setInterval(updateToken, 50000);
updateToken();
