class AuthContext {
  private _user: any = null;
  private _isLoading: boolean = true;

  private listeners = new Set<() => void>();

  get user() {
    return this._user;
  }

  get isLoading() {
    return this._isLoading;
  }

  setUser(user: any) {
    this._user = user;
    this.notify();
  }

  setIsLoading(isLoading: boolean) {
    this._isLoading = isLoading;
    this.notify();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    for (const listener of this.listeners) {
      listener();
    }
  }
}

export default AuthContext;
