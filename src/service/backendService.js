import { BACKEND_API } from "../utils/constants";

export class BackendService {
  #url;
  constructor(collection) {
    this.#url = BACKEND_API + collection + "/";
  }

  async getAllAsync() {
    const response = await fetch(this.#url);
    if (response.ok) {
      return await this.#success(response);
    } else {
      this.#failure(response);
    }
  }

  async getByIdAsync(id) {
    const response = await fetch(`${this.#url}${id}`);
    if (response.ok) {
      return await this.#success(response);
    } else {
      this.#failure(response);
    }
  }

  async getByTopicAsync(topic) {
    const response = await fetch(`${this.#url}bytopic/${topic}`);
    if (response.ok) {
      return await this.#success(response);
    } else {
      this.#failure(response);
    }
  }

  async getByQnSAsync(quizId , studentId) {
    const response = await fetch(`${this.#url}byQnS/${quizId}/${studentId}`);
    if (response.ok) {
      console.log(response);
      return await this.#success(response);
    } else {
      this.#failure(response);
    }
  }

  async postAsync(item) {
    return fetch(this.#url, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.#success)
      .catch(this.#failure);
  }

  async patchAsync(item, id) {
    return fetch(this.#url + id, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.#success)
      .catch(this.#failure);
  }

  async deleteAsync(id) {
    return fetch(this.#url + id, {
      method: "DELETE",
    })
      .then(this.#success)
      .catch(this.#failure);
  }

  async #success(response) {
    const data = await response.json();
    return data;
  }

  #failure(response) {
    const message = `An error has occured: ${response}`;
    throw new Error(message);
  }
}
