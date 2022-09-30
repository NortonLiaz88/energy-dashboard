import React, { useState } from 'react';
import { FilterWrapper, Title, Input, InputWrapper, Search } from './styles';

export interface FilterProps {
  onFilter(variable: string): void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }: FilterProps) => {
  const [input, setInput] = useState<string>('');

  const handleKeyDown = (value: string) => {
    if (value === 'Enter') {
      onFilter(input);
    }
  };

  return (
    <FilterWrapper>
      <Title>Atendimentos</Title>
      <InputWrapper>
        <Input
          onChange={ele => setInput(ele.target.value)}
          onKeyDown={ele => handleKeyDown(ele.key)}
        />
        <Search onClick={() => onFilter(input)} />
      </InputWrapper>
    </FilterWrapper>
  );
};

export default Filter;
