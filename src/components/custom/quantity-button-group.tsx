
export const QuantityButtonGroup = ({ quantity, onChange }: { quantity?: number, onChange: ((agr0: number) => void) }) => {
    return (
        <div className="flex items-center gap-3">
            <button className="w-6 h-6 border border-solid-2 rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors duration-200"
                onClick={() => {

                    let number = quantity ?? 0
                    number -= 1
                    if (number ?? 0 <= 0) {
                        number = 0
                    }
                    onChange(number)
                }}

            >
                <span className="text-lg font-normal">-</span>
            </button>
            <span>{quantity ?? 0}</span>
            <button className="w-6 h-6 border border-solid-2 rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors duration-200"
                onClick={() => {

                    let number = quantity ?? 0
                    number += 1

                    onChange(number)
                }}
            >
                <span className="text-lg font-normal">+</span>
            </button>
        </div>
    )
};