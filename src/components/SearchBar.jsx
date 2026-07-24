
import React from 'react';
import { useTranslation } from 'react-i18next';

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const { t } = useTranslation();

  return (
    <div className="search-bar">
      <input className="p-1 b br-4 bg c"
        type="text"
        placeholder={t('search.placeholder')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
