export type DossierToast = { title: string; body?: string };

/** Fire a dossier-style toast from anywhere on the page. */
export function showToast(toast: DossierToast) {
  window.dispatchEvent(new CustomEvent<DossierToast>("dossier-toast", { detail: toast }));
}
