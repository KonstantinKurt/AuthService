export function getNewIpRender(result: boolean) {
    let message;
    result ? message = 'Ip added to trusted list' : message = 'Link is expired';
    return `
      <p style="color: green; alignment: center; ">${message}</p>
      <a  href="http://localhost:4200/profile">Go to web site</a>
`;
}
