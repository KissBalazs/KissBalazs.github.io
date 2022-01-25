// {"asd":1, "axcdx":2}
var obj = {}

function loadSavedElements(){
    loginNameElement = document.getElementById('loginName');
    instituteIdElement = document.getElementById('instituteId');
    departmentIdElement = document.getElementById('departmentId');

    loginNameElement.value = localStorage.getItem(key_loginName) ?? '';
    instituteIdElement.value = localStorage.getItem(key_instituteId) ?? '';
    departmentIdElement.value = localStorage.getItem(key_departmentId) ?? '';
}

function createBody() {
    obj = {
        loginName: (document.getElementById('loginName').value),
        instituteId: document.getElementById('instituteId').value,
        departmentId: document.getElementById('departmentId').value,
    }
    localStorage.setItem(key_loginName, obj.loginName)
    localStorage.setItem(key_instituteId, obj.instituteId)
    localStorage.setItem(key_departmentId, obj.departmentId)
    try {
        const roles = document.getElementById('roles').value;
        if (roles != null && roles.length > 0 && roles !== "[ ]") {
            obj.roles = JSON.parse(roles);
        }
    } catch (e) {
        alert("Hiba a roles JSON-ben!: " + e);
        throw (e);
    }

    try {
        const dataExchangeContainer = document.getElementById('dataExchangeContainer').value;
        if (dataExchangeContainer != null && dataExchangeContainer.length > 0) {
            obj.dataExchangeContainer = JSON.parse(dataExchangeContainer);
        }
    } catch (e) {
        alert("Hiba a dataExchangeContainer JSON-ben!: " + e);
        throw (e);
    }

    return obj;
}

function sendRequest(event) {
    event.preventDefault();
    const url = "https://user-service.atr-sandbox.icellmobilsoft.hu/test/user/his/jwt";
    const body = createBody()
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(
        response => response.json()
    ).then(
        res => {
            if (res.funcCode === 'ERROR') {
                handleError(res);
            } else {
                handleOk(res)
            }
        }
    ).catch(function (error) {
        alert(error);
    });
}

function handleError(err) {
    log.textContent = JSON.stringify(err, undefined, 4);
    original.textContent = JSON.stringify(obj, undefined, 4);
    errorArea.className = "row"
    correctResult.className = "visually-hidden"
    resTypeText.textContent = "Hiba történt:"
}

function handleOk(res) {
    errorArea.className = "visually-hidden"
    correctResult.className = "row"
    resTypeText.textContent = "Siker"
    console.log(res);
    let jwtTokenField = document.getElementById('jwtTokenField');
    let kettabosLinkElement = document.getElementById('kettabosLink');
    let mindentabosLink = document.getElementById('mindentabosLink');
    let kettabosLinkElement2 = document.getElementById('kettabosLink2');
    let mindentabosLink2 = document.getElementById('mindentabosLink2');
    jwtTokenField.textContent = res.hisJwt
    kettabosLinkElement.href = `https://plugin.atr-sandbox.icellmobilsoft.hu/plugin-frontend/patientData?hisJwt=${res.hisJwt}`
    kettabosLinkElement.textContent = `https://plugin.atr-sandbox.icellmobilsoft.hu/plugin-frontend/patientData?hisJwt=${res.hisJwt}`
    mindentabosLink.href = `https://plugin.atr-sandbox.icellmobilsoft.hu/plugin-frontend/medicalPatientData?hisJwt=${res.hisJwt}`
    mindentabosLink.textContent = `https://plugin.atr-sandbox.icellmobilsoft.hu/plugin-frontend/medicalPatientData?hisJwt=${res.hisJwt}`
    kettabosLinkElement2.href = `http://localhost:4200/patientData?hisJwt=${res.hisJwt}`
    kettabosLinkElement2.textContent = `http://localhost:4200/patientData?hisJwt=${res.hisJwt}`
    mindentabosLink2.href = `http://localhost:4200/medicalPatientData?hisJwt=${res.hisJwt}`
    mindentabosLink2.textContent = `http://localhost:4200/medicalPatientData?hisJwt=${res.hisJwt}`
}

function copyElementTextToClipboard(element) {
    navigator.clipboard.writeText(element.textContent);
}

const form = document.getElementById('form');
const log = document.getElementById('log');
const errorArea = document.getElementById('error-feedback');
const correctResult = document.getElementById('correct-result');
const resTypeText = document.getElementById('resTypeText');
const key_loginName = "MOCK_HIS_LOGINNAME";
const key_instituteId = "MOCK_HIS_INSTITUTEID";
const key_departmentId = "MOCK_HIS_DEPARTMENTID";
form.addEventListener('submit', sendRequest);

loadSavedElements();

/**
 "loginName": "tplgatr",
 "instituteId": "E198100",
 "departmentId": "198103100",
 "roles": [
 "dgcrat-default"
 ],
 */
