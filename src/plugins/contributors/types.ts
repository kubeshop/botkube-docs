type Contributor = {
  id: number
  login: string
  avatar_url: string
  contributions: number
  html_url: string
};

export type PluginContributorsData = {
  contributors: Contributor[]
};
