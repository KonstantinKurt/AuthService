export function getNewIpLetter(recipient, ip, browser, device, link) {
    return {
        from: process.env.EMAIL,
        to: recipient.email,
        subject: `Login from a new IP`,
        html:
            `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body>
    <div">
        <p>Greetings <span style="color: red">${recipient.name}</span>!</p>
        <p>Someone logged in your account from: </p>
        <p>Ip: ${ip}</p>
        <p>Browser: ${browser}</p>
        <p>Device: ${device}</p>
        <p>Time(UTC): ${new Date()}</p>
        <p>To confirm that its you,please,follow this link</p>
        <p><a href="${link}" style="color: blue">Confirm new IP</a></p>
        </div>
</body>
</html>\
`,
    };
}
