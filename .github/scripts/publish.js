module.exports = function({context, github}) {
  console.log(`Releasing: ${process.env.VERSION}`);
  const rawVersion = process.env.VERSION.replaceAll('v', '');
  const versionParts = rawVersion.trim().split('.');
  if (versionParts.length != 3) {
    throw new Error(`Expected version major, minor and patch values. ${process.env.VERSION} => ${versionParts}`);
  }
  const versions = [
    `v${versionParts[0]}`,
    `v${versionParts[0]}.${versionParts[1]}`,
    `v${versionParts[0]}.${versionParts[1]}.${versionParts[2]}`,
  ];
  console.log(`Versions => ${versions}`);
}
