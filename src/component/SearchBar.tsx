import React from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchBarProps {
    query: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    onSubmit: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, handleInputChange, handleKeyDown, inputRef, onSubmit }) => {
    return (
        <SearchBarWrapper onSubmit={onSubmit}>
            <Title>질환 검색하기</Title>
            <InputWrapper>
                <AiOutlineSearch size={18} style={{ marginRight: 8 }} />
                <Input type="text" value={query} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="검색어를 입력하세요" ref={inputRef} />
                <SearchButton type="submit">검색</SearchButton>
            </InputWrapper>
        </SearchBarWrapper>
    );
};

const SearchBarWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20vh;
    margin-bottom: 16px;
`;

const Title = styled.h2`
    font-weight: bold;
    margin-bottom: 16px;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 20px;
    padding: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 40vw;
    min-width: 320px;
`;

const Input = styled.input`
    padding: 8px;
    border: none;
    outline: none;
    width: 200px;
    flex: 1;
`;

const SearchButton = styled.button`
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`;

export default SearchBar;
