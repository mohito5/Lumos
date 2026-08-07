import { useEffect, useRef } from "react";
import "./Range.css";

export default function Range({
    value,
    min = 0,
    max = 100,
    step = 1,

    onChange,

    onDecrease,
    onIncrease,

    disabled = false,

    className = "",

    startIcon = "#icon-range",
    thumbIcon = "#icon-range",
}) {
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const thumbRef = useRef(null);

    const percent = ((value - min) / (max - min)) * 100;

    useEffect(() => {
        if (!wrapperRef.current || !thumbRef.current || !inputRef.current)
            return;

        wrapperRef.current.style.setProperty("--progress", `${percent}%`);

        const input = inputRef.current;

        const thumbWidth = 32;

        const usableWidth = input.offsetWidth - thumbWidth;

        const x = (usableWidth * percent) / 100;

        thumbRef.current.style.transform = `translate(${x}px,-50%)`;
    }, [percent]);

    const handleChange = (e) => {
        onChange?.(Number(e.target.value));
    };

    const decrease = () => {
        if (disabled) return;

        if (onDecrease) {
            onDecrease();
            return;
        }

        onChange?.(Math.max(min, value - step));
    };

    const increase = () => {
        if (disabled) return;

        if (onIncrease) {
            onIncrease();
            return;
        }

        onChange?.(Math.min(max, value + step));
    };

    return (
        <div className={`lumos-range border ${className}`}>

            <button
                type="button"
                className="lumos-range__button radius-2 border flex p-1 background-r"
                onClick={decrease}
                disabled={disabled || value <= min}
            >
                <svg className='icon-sm'><use href='#icon-arrow-left'></use></svg>
            </button>

            <div className="lumos-range__wrapper p-1 border radius-4" ref={wrapperRef}>
                <svg className="lumos-range__start" aria-hidden="true">
                    <use href={startIcon} />
                </svg>

                <div className="lumos-range__track border">
                    <div className="lumos-range__fill" />
                </div>


                <input
                    ref={inputRef}
                    className="lumos-range__input border color-pine"
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    disabled={disabled}
                    onChange={handleChange}
                />

                <svg
                    className="lumos-range__thumb"
                    ref={thumbRef}
                    aria-hidden="true"
                >
                    <use href={thumbIcon} />
                </svg>

            </div>

            <button
                type="button"
                className="lumos-range__button"
                onClick={increase}
                disabled={disabled || value >= max}
            >
                +
            </button>

        </div>
    );
}