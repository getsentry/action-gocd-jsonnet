async function getRelease(octokit, context, tag) {
  try {
    const resp = await octokit.rest.repos.getReleaseByTag({
      owner: context.repo.owner,
      repo: context.repo.repo,
      tag,
    });
    return resp.data.id;
  } catch (err) {

  }
  return null;
}

module.exports = async function({context, octokit}) {
  console.log(`Releasing Version: ${process.env.VERSION}`);
  const rawVersion = process.env.VERSION.replaceAll('v', '');
  const versionParts = rawVersion.trim().split('.');
  if (versionParts.length != 3) {
    throw new Error(`Expected version major, minor and patch values. ${process.env.VERSION} => ${versionParts}`);
  }
  const tagNames = [
    `v${versionParts[0]}.${versionParts[1]}.${versionParts[2]}`,
    `v${versionParts[0]}.${versionParts[1]}`,
    `v${versionParts[0]}`,
  ];

  for (const t of tagNames) {
    console.log(`Creating release ${t}`);
    const releaseID = await getRelease(octokit, context, t);
    if (releaseID) {
      console.log(`    Updating release ${t}`, releaseID);
      await octokit.rest.repos.updateRelease({
        owner: context.repo.owner,
        repo: context.repo.repo,
        release_id: releaseID,
        tag_name: t,
        target_commitish: 'main',
      });
    } else {
      console.log(`    Creating release ${t} not found`);
      await octokit.rest.repos.createRelease({
        owner: context.repo.owner,
        repo: context.repo.repo,
        tag_name: t,
      });
    }
  }
}
