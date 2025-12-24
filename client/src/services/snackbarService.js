class SnackbarService {
  constructor() {
    this.listener = null;
  }

  setListener(listener) {
    this.listener = listener;
  }

  show(message, type = "info") {
    if (this.listener) {
      this.listener(message, type);
    }
  }
}

export const snackbarService = new SnackbarService();
