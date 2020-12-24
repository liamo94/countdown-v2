export type LettersOk = {
  type: "ok";
  letters: string[];
};

export type LettersError = {
  type: "error";
  message: string;
};

export type LettersLoading = {
  type: "loading";
};

export type Letters = LettersError | LettersOk | LettersLoading;

class Dictionary {
  getWords() {
    return new Promise<Letters>((resolve, reject) => {
      fetch(
        "https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json"
      )
        .then((res) => res.json())
        .then((result) => {
          resolve({ type: "ok", letters: Object.keys(result) });
        })
        .catch((error) => {
          reject({ type: "error", message: error.toString() });
        });
    });
  }
}

export const dictionary = new Dictionary();
