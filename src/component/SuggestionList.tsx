import React from "react";
import styled, { css } from "styled-components";

interface SuggestionListProps {
    suggestions: string[];
    selectedSuggestionIndex: number;
    onSuggestionClick: (suggestion: string) => void;
}

const SuggestionList: React.FC<SuggestionListProps> = ({ suggestions, selectedSuggestionIndex, onSuggestionClick }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const selectedSuggestion = suggestions[selectedSuggestionIndex];
            onSuggestionClick(selectedSuggestion);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const newIndex = selectedSuggestionIndex > 0 ? selectedSuggestionIndex - 1 : suggestions.length - 1;
            onSuggestionSelect(newIndex);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const newIndex = selectedSuggestionIndex < suggestions.length - 1 ? selectedSuggestionIndex + 1 : 0;
            onSuggestionSelect(newIndex);
        }
    };

    const onSuggestionSelect = (index: number) => {
        if (index >= 0 && index < suggestions.length) {
            onSuggestionClick(suggestions[index]);
        }
    };

    return (
        <SuggestionsList>
            <ScrollableWrapper>
                {suggestions.map((suggestion, index) => (
                    <SuggestionItem
                        key={index}
                        className={index === selectedSuggestionIndex ? "selected" : ""}
                        onClick={() => onSuggestionClick(suggestion)}
                        onKeyDown={handleKeyDown}
                        tabIndex={0} // Make the item focusable
                    >
                        {suggestion}
                    </SuggestionItem>
                ))}
                {suggestions.length === 0 && <NoSuggestions>검색어 없음</NoSuggestions>}
            </ScrollableWrapper>
        </SuggestionsList>
    );
};

const SuggestionsList = styled.ul`
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: 400px;
    overflow-y: auto;
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 40vw;
    min-width: 320px;
    border-radius: 8px;
`;

const ScrollableWrapper = styled.div`
    max-height: 400px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
`;

const SuggestionItem = styled.li`
    padding: 8px;
    cursor: pointer;

    &:hover,
    &:focus {
        background-color: #f0f0f0;
    }

    &.selected {
        background-color: #f0f0f0;
    }
`;

const NoSuggestions = styled.div`
    padding: 8px;
    color: #999;
`;

export default SuggestionList;
