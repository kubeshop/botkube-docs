---
id: privacy
title: "Privacy & legal"
---

# Privacy & Legal

## Botkube App

### Privacy Policy

**Last updated** **July 18, 2022**

To improve the user experience, Botkube collects anonymized data. It does not collect any identifying information, and all analytics are used only as aggregated collection of data to improve Botkube and adjust its roadmap. The analytics collection is enabled by default with an option to opt-out.

#### What data we collect

The analytics data we collect is limited to:

- Botkube version,
- Kubernetes version,
- Names of enabled integrations (notifiers and bots),
- Handled events in anonymized form, grouped by the integration (communication platform) name.

  For each event, we collect its type (e.g. `create` or `delete`), resource API Version and resource Kind. Any custom resource API groups or Kinds are excluded from the analytics collection.

- Executed commands in anonymized form.

  For `kubectl` commands, only the command verb is collected. Resource name and namespace are excluded from the analytics collection.

- App errors (crashes, configuration and notification errors).

For identifying Botkube installations, we use unique identifiers generated in the following way:

- As an anonymous cluster identifier, we use the `uid` of `kube-system` Namespace,
- As an anonymous installation identifier, we use UUID generated during Helm chart installation and persisted in a ConfigMap.

#### How to opt out

To disable sending the anonymous analytics, provide the `analytics.disable: true` override during Helm chart installation or upgrade. See the [Helm chart parameters](/configuration/helm-chart-parameters/#values) for more details about Helm chart configuration.

## Website

### Cookie Policy

**Last updated** **July 06, 2022**

This Cookie Policy explains how Kubeshop ("**Company**", "**we**", "**us**", and "**our**") uses cookies and similar technologies to recognize you when you visit our websites at [https://botkube.io](https://botkube.io), ("**Websites**"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.

In some cases we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.

**What are cookies?**

Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.

Cookies set by the website owner (in this case, Kubeshop) are called "first party cookies". Cookies set by parties other than the website owner are called "third party cookies". Third party cookies enable third party features or functionality to be provided on or through the website (e.g. like advertising, interactive content and analytics). The parties that set these third party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.

**Why do we use cookies?**

We use first and third party cookies for several reasons. Some cookies are required for technical reasons in order for our Websites to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Websites for advertising, analytics and other purposes. This is described in more detail below.

The specific types of first and third party cookies served through our Websites and the purposes they perform are described below (please note that the specific cookies served may vary depending on the specific Online Properties you visit):

**How can I control cookies?**

You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.

The Cookie Consent Manager can be found in the notification banner and on our website. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.

In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit [http://www.aboutads.info/choices/](http://www.aboutads.info/choices/) or [http://www.youronlinechoices.com](http://www.youronlinechoices.com).

The specific types of first and third party cookies served through our Websites and the purposes they perform are described in the table below (please note that the specific cookies served may vary depending on the specific Online Properties you visit):

**Analytics and customization cookies:**

These cookies collect information that is used either in aggregate form to help us understand how our Websites are being used or how effective our marketing campaigns are, or to help us customize our Websites for you.

| Name     | Description                                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Name     | `\_ga`                                                                                                                                |
| Purpose  | It records a particular ID used to come up with data about website usage by the user. It is a HTTP cookie that expires after 2 years. |
| Provider | `.botkube.io`                                                                                                                         |
| Service  | Google Analytics [View Service Privacy Policy](https://policies.google.com/technologies/ads)                                          |
| Country  | United States                                                                                                                         |
| Type     | `http\_cookie`                                                                                                                        |

| Name     | Description                                                                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name     | `\_ga\_#`                                                                                                                                                         |
| Purpose  | Used to distinguish individual users by means of designation of a randomly generated number as client identifier, which allows calculation of visits and sessions |
| Provider | `.botkube.io`                                                                                                                                                     |
| Service  | Google analytics [View Service Privacy Policy](https://policies.google.com/technologies/ads)                                                                      |
| Country  | United States                                                                                                                                                     |
| Type     | `http\_cookie`                                                                                                                                                    |

**What about other tracking technologies, like web beacons?**

Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enable us to recognize when someone has visited our Websites or opened an e-mail including them. This allows us, for example, to monitor the traffic patterns of users from one page within a website to another, to deliver or communicate with cookies, to understand whether you have come to the website from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of e-mail marketing campaigns. In many instances, these technologies are reliant on cookies to function properly, and so declining cookies will impair their functioning.

**Do you use Flash cookies or Local Shared Objects?**

Websites may also use so-called "Flash Cookies" (also known as Local Shared Objects or "LSOs") to, among other things, collect and store information about your use of our services, fraud prevention and for other site operations.

If you do not want Flash Cookies stored on your computer, you can adjust the settings of your Flash player to block Flash Cookies storage using the tools contained in the [Website Storage Settings Panel](http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html). You can also control Flash Cookies by going to the [Global Storage Settings Panel](http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html) and following the instructions (which may include instructions that explain, for example, how to delete existing Flash Cookies (referred to "information" on the Macromedia site), how to prevent Flash LSOs from being placed on your computer without your being asked, and (for Flash Player 8 and later) how to block Flash Cookies that are not being delivered by the operator of the page you are on at the time).

Please note that setting the Flash Player to restrict or limit acceptance of Flash Cookies may reduce or impede the functionality of some Flash applications, including, potentially, Flash applications used in connection with our services or online content.

**Do you serve targeted advertising?**

Third parties may serve cookies on your computer or mobile device to serve advertising through our Websites. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in. They may also employ technology that is used to measure the effectiveness of advertisements. This can be accomplished by them using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you. The information collected through this process does not enable us or them to identify your name, contact details or other details that directly identify you unless you choose to provide these.

**How often will you update this Cookie Policy?**

We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.

The date at the top of this Cookie Policy indicates when it was last updated.

**Where can I get further information?**

If you have any questions about our use of cookies or other technologies, please email us at [**frontdesk@kubeshop.io**](mailto:frontdesk@kubeshop.io).

_This cookie policy was created using [Termly’s Cookie Consent Manager](https://termly.io/en/products/cookie-consent-manager)._

### Disclaimer

**Last updated** **July 06, 2022**

**WEBSITE DISCLAIMER**

The information provided by Kubeshop (“we,” “us”, or “our”) on [https://botkube.io/](https://botkube.io/) (the “Site”) is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the Site. UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.

**EXTERNAL LINKS DISCLAIMER**

The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN ANY BANNER OR OTHER ADVERTISING. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.

_This disclaimer was created using [Termly’s Disclaimer Generator](https://termly.io/products/disclaimer-generator)._
