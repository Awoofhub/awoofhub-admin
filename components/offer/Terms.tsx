interface Props {
    prop: string;
}

export default function Terms({ prop }: Props) {
    return (
        <section className="space-y-2">
            <h3 className="font-bold text-xl text-gray-900">Terms & conditions</h3>

            <div className="text-sm leading-relaxed text-gray-600 break-words">
                {prop}
            </div>
        </section>
    );
}