const PLAYER_LOOKUP_URL = 'https://playerdb.co/api/player/minecraft/';
const SKIN_RENDER_URL = 'https://starlightskins.lunareclipse.studio/render/';

async function fetchSkinTextureUrl(username) {
  const response = await fetch(PLAYER_LOOKUP_URL + encodeURIComponent(username));
  const body = await response.json();
  return body.data.player.skin_texture;
}

function buildRenderUrl(pose, crop, skinTextureUrl) {
  return `${SKIN_RENDER_URL}${pose}/${crop}?skinUrl=${encodeURIComponent(skinTextureUrl)}`;
}

async function loadSkinRender(image) {
  const { player, pose, crop } = image.dataset;
  try {
    const skinTextureUrl = await fetchSkinTextureUrl(player);
    image.src = buildRenderUrl(pose, crop, skinTextureUrl);
  } catch (error) {
    console.warn(`Could not load skin render for ${player}`, error);
  }
}

document.querySelectorAll('img[data-player]').forEach(loadSkinRender);
