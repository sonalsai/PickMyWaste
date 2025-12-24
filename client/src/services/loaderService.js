class LoaderService {
  constructor() {
    this.listener = null;
    this.loading = false;
  }

  setListener(listener) {
    this.listener = listener;
    // Initialize listener with current state in case component re-mounts
    if (this.listener) {
      this.listener(this.loading);
    }
  }

  show() {
    this.loading = true;
    if (this.listener) {
      this.listener(true);
    }
  }

  hide() {
    this.loading = false;
    if (this.listener) {
      this.listener(false);
    }
  }
}

export const loaderService = new LoaderService();
export const showLoader = () => loaderService.show();
export const hideLoader = () => loaderService.hide();
