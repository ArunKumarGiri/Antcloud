import React from 'react';

interface PricingCardsProps {
    isSelected: boolean;
    onClick: (index: number, planNameRef: HTMLElement) => void;
    resolution: string;
    planName: string;
    planCode: string;
    planPrice: string;
    discountDetails: any;
    planHourLimit: number;
    planTerm: number;
    index: number;
    disabled?: boolean;
    setQuantity: (quantity: number) => void;
    quantity: number;
}

const PricingCards: React.FC<PricingCardsProps> = ({
    isSelected,
    onClick,
    resolution,
    planName,
    // planCode,
    planPrice,
    discountDetails,
    planHourLimit,
    planTerm,
    index,
    disabled,
    setQuantity,
    quantity
}) => {
    const planNameRef = React.useRef<HTMLLIElement>(null);

    const handleClick = () => {
        if (planNameRef.current) {
            onClick(index, planNameRef.current);
        }
    };

    return (
        <div className="pricingN-cols pricingN-cols-lg">
            <ul>
                <li className="pricingN-heading" ref={planNameRef}>
                    {planName}
                </li>
                <li className="pricingN-subHeading">
                    ₹{planPrice}
                    {discountDetails && (
                        <span className="discount-badge">
                            {discountDetails.type === 'percentage'
                                ? `${discountDetails.amount}% OFF`
                                : `₹${discountDetails.amount} OFF`}
                        </span>
                    )}
                </li>
                <li>{planHourLimit} hours</li>
                <li>{resolution}</li>
                <li>12 GB RAM</li>
                <li>250 GB SSD</li>
                <li>Enabled</li>
                <li>{planTerm} days</li>
                {planName === "TopUp" && (
                    <li>
                        <div className="quantity-selector">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span>{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </li>
                )}
                <li>
                    <button
                        className={`btn-comm ${isSelected ? 'selected' : ''}`}
                        onClick={handleClick}
                        disabled={disabled}
                    >
                        {isSelected ? 'Selected' : 'Select'}
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default PricingCards; 