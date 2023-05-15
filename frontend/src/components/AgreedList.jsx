
export default function RankChoices(props) {

  const weightedSort = (lst) => {
    return lst.sort((a,b) => b.weight - a.weight)
  }

  return (
    <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Ranked names</h5>
      {weightedSort(props.names).map((item) => (
        <p className="mb-3 text-gray-500 dark:text-white">
          {item.name}-{item.weight}
        </p>
			))}
    </div>
  )
}