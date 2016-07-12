import { observable } from 'mobx';

export default class LoginModel {
  @observable
  username = '';

  @observable
  password = '';

  @observable
  loading = false;

  @observable
  error = null;
}