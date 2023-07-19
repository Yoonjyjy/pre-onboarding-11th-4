import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import SuggestionList from "./SuggestionList";

const SearchBarContainer: React.FC = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [cache, setCache] = useState<Record<string, { data: string[]; expireTime: number }>>({});
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (query.trim() !== "") {
            if (cache[query] && cache[query].expireTime > Date.now()) {
                setSuggestions(cache[query].data);
            } else {
                callApiForSuggestionsThrottled(query);
            }
        } else {
            setSuggestions([]);
        }

        setSelectedSuggestionIndex(-1);
    }, [query, cache]);

    const callApiForSuggestions = async (keyword: string) => {
        console.info("calling api 단어 : " + keyword);
        const url = `http://localhost:4000/sick?q=${encodeURIComponent(keyword)}`;

        try {
            const response = await axios.get(url);
            const suggestionsData = response.data.map((item: { sickNm: string }) => item.sickNm);
            const expireTime = Date.now() + 60 * 5000; // 5분 후에 데이터 만료

            setCache((prevCache) => ({
                ...prevCache,
                [keyword]: { data: suggestionsData, expireTime },
            }));

            setSuggestions(suggestionsData);
        } catch (error) {
            console.error("API 호출 에러:", error);
        }
    };

    const callApiForSuggestionsThrottled = (keyword: string) => {
        if (throttleTimeoutRef.current) {
            clearTimeout(throttleTimeoutRef.current);
        }

        throttleTimeoutRef.current = setTimeout(() => {
            callApiForSuggestions(keyword);
        }, 300);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (value.trim() !== "") {
            callApiForSuggestionsThrottled(value);
        } else {
            setSuggestions([]);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`검색어 : ${query}`);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedSuggestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1));
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedSuggestionIndex((prevIndex) => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0));
        } else if (e.key === "Enter" && selectedSuggestionIndex !== -1) {
            e.preventDefault();
            const selectedSuggestion = suggestions[selectedSuggestionIndex];
            setQuery(selectedSuggestion);
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <AppWrapper>
            <SearchBar handleInputChange={handleInputChange} handleKeyDown={handleKeyDown} inputRef={inputRef} onSubmit={handleFormSubmit} query={query} />
            <SuggestionList suggestions={suggestions} selectedSuggestionIndex={selectedSuggestionIndex} onSuggestionClick={handleSuggestionClick} />
        </AppWrapper>
    );
};

export default SearchBarContainer;

const AppWrapper = styled.div`
    background-color: #c9e6ff;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
`;
