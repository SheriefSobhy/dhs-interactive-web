# DHS Interactive website

Plain HTML, CSS, and small vanilla JavaScript site for Azure Static Web Apps Free. It uses no build step, API, database, or paid service.

## Deploy to Azure Static Web Apps

Create a Static Web App with the **Custom** build preset and configure:

- App location: `/`
- API location: *(leave empty)*
- Output location: *(leave empty)*

The root `index.html` and each nested directory's `index.html` are entry points. The site uses relative URLs so its navigation works at the Azure-generated hostname without a custom domain. No `staticwebapp.config.json` is needed for these static directory routes. Azure can deploy directly from the repository without a build command.

## Add an app

Add an app card to `apps/index.html`, then create its product page as `apps/<slug>/index.html`. Put privacy and support pages under `apps/<slug>/privacy/index.html` and `apps/<slug>/support/index.html` where applicable. Use relative links and add shared page styling to `assets/site.css`.

## Flooth policy review items

The public policy preserves the supplied draft's disclosures. Review these unresolved points before relying on the policy for a release:

- Confirm whether the Firebase-before-Flutter startup edge case can retain an earlier Analytics-enabled state when the saved preference is missing, invalid, or unreadable. The policy does not promise that Analytics is blocked before consent reconciliation.
- Verify the Firebase Analytics property retention settings and any project-specific Crashlytics settings. The policy states these have not been verified.
- Confirm the final Firebase SDK behavior and data disclosures against the release build and current Play Console requirements.
- Confirm that the policy content and public HTTPS URL are ready before entering the URL in Play Console.

These are review flags, not new claims about the app. The privacy contact shown in the policy is the one supplied in the draft.
