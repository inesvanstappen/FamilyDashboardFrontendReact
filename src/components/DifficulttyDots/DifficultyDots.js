function DifficultyDots({level}) {
    return (
        <div className="flex gap-2">
            {Array.from({length: level}).map((i) => (
                <span key={i} className="w-3 h-3 bg-primary rounded-full"/>
            ))}
        </div>
    )
}

export default DifficultyDots;