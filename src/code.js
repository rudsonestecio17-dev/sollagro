const SB_URL = "https://mcahoawxselcrbfjhivd.supabase.co";
const SB_KEY = "sb_publishable_ihiNA8eqGLo0ouIeHMXEpQ_fjgQbhSP";

function buscarDadosSupabase(tabela) {
  const url = `${SB_URL}/rest/v1/${tabela}?select=*`;
  const options = {
    "method": "get",
    "headers": {
      "apikey": SB_KEY,
      "Authorization": "Bearer " + SB_KEY
    }
  };
  
  const response = UrlFetchApp.fetch(url, options);
  return JSON.parse(response.getContentText());
}

function doGet() {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('SollAgro')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
