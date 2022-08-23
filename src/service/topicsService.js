import { API_URL } from "../utils/constants";

export class TopicsService {
  #url = API_URL + "topics/";

  async getAll() {
    const response = await fetch(this.#url);
    if (response.ok) {
      return await this.#success(response);
    } else {
      this.#failure(this.#success);
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

  async postAsync(topic) {
    return fetch(this.#url, {
      method: "POST",
      body: JSON.stringify(topic),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.#success)
      .catch(this.#failure);
  }

  async putAsync(topic, id) {
    return fetch(this.#url + id, {
      method: "PUT",
      body: JSON.stringify(topic),
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
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
}
