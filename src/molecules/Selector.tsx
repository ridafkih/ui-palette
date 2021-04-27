import React, { useEffect, useRef } from "react";
import styled from "styled-components";

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
  default: boolean;
  content: string;
}

function Selector({ options }: { options: Option[] }) {
  const defaultRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  let selected: HTMLElement;

  function placeIndicator({ target: option }: any) {
    const container = containerRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    selected = option;

    const containerBounds = container.getBoundingClientRect();
    const buttonBounds = option.getBoundingClientRect();

    const diff = buttonBounds.x - containerBounds.x;

    indicator.style.transform = `translateX(${diff}px)`;
    indicator.style.width = `${option.clientWidth}px`;
  }

  useEffect(() => {
    placeIndicator({ target: defaultRef.current });
    window.addEventListener("resize", () => {
      placeIndicator({ target: selected });
    });
  }, []);

  return (
    <OptionsContainer ref={containerRef}>
      <Indicator className="indicator" ref={indicatorRef}></Indicator>
      {options.map((option, index) => {
        return (
          <OptionElement
            key={index}
            onClick={placeIndicator}
            ref={option.default ? defaultRef : undefined}
          >
            {option.content}
          </OptionElement>
        );
      })}
    </OptionsContainer>
  );
}

export default Selector;
