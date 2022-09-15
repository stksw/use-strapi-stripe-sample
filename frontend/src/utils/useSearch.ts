import React, { useState } from 'react';

export const useSearch = () => {
  const [searchWord, setSearchWord] = useState('');

  const onChangeWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    const word = e.target.value ? e.target.value.toLocaleLowerCase() : '';
    setSearchWord(word);
  };

  return {
    searchWord,
    onChangeWord,
  };
};
