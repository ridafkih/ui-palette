import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useWindowSize } from "../services/window.service";

const OptionsContainer = styled.div`
  border-radius: 64px;

  padding: 6px;

  position: relative;

  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  background: #262626;
`;

const OptionElement = styled.div`
  margin-right: 8px;
  margin-left: 8px;
  padding: 6px 16px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-size: 18px;
  user-select: none;
  z-index: 1;

  &:nth-child(2) {
    margin-right: 8px;
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
    margin-left: 8px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Indicator = styled.div`
  height: calc(100% - 8px);

  position: absolute;
  left: 0;

  margin: auto;

  border-radius: 64px;
  background: #307fe2;

  transition: 0.16s ease;

  z-index: 0;
`;

interface Option {
  label: string;
  value: string;
}

interface Selection {
  fieldName: string,
  selectedValue: string | null
}

function Selector({
  fieldName,
  options,
  onSelectionChange,
}: {
  fieldName: string,
  options: Option[];
  onSelectionChange?: Function;
}) {
  const windowSize = useWindowSize();

  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const [selectedValue, setSelectedValue] = useState<string | null>(
    options[0].value
  );

  function handleOptionClick({
    currentTarget: option,
  }: React.MouseEvent<HTMLDivElement>) {
    const { optionValue } = option.dataset;
    setSelectedValue(optionValue ?? null);
  }

  useEffect(() => {
    if (!onSelectionChange) return;
      const selection: Selection = { fieldName, selectedValue }; 
      onSelectionChange(selection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  useEffect(() => {
    const container = containerRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    const selectedElement = document.querySelector(
      `[data-option-value='${selectedValue}']`
    ) as HTMLElement;
    if (!selectedElement) return;

    const containerBounds = container.getBoundingClientRect();
    const buttonBounds = selectedElement.getBoundingClientRect();

    const diff = buttonBounds.x - containerBounds.x;

    indicator.style.transform = `translateX(${diff}px)`;
    indicator.style.width = `${selectedElement.clientWidth}px`;
  }, [windowSize, selectedValue]);

  return (
    <OptionsContainer ref={containerRef}>
      <Indicator className="indicator" ref={indicatorRef}></Indicator>
      {options.map((option, index) => {
        return (
          <OptionElement
            key={index}
            data-option-value={option.value}
            onClick={handleOptionClick}
          >
            {option.label}
          </OptionElement>
        );
      })}
    </OptionsContainer>
  );
}

export default Selector;
