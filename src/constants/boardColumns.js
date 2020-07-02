import cardStatuses from "./cardStatuses"
import boardColumsLabels from "./boardColumsLabels"
import IdeaIcon from "../iconComponents/IdeaIcon"
import RoadIcon from "../iconComponents/RoadIcon"
import SettingsIcon from "../iconComponents/SettingsIcon"
import QuestionIcon from "../iconComponents/QuestionIcon"
import CheckIcon from "../iconComponents/CheckIcon"

export default [
  {
    status: "backlog",
    color: "#9BAAB2",
    label: boardColumsLabels[cardStatuses.BACKLOG],
    Icon: IdeaIcon,
    cardsGetter: tasks => tasks.filter(({ status }) => status === cardStatuses.BACKLOG),
  },
  {
    status: "selected",
    color: "#F9D648",
    label: boardColumsLabels[cardStatuses.SELECTED],
    Icon: RoadIcon,
    cardsGetter: tasks => tasks.filter(({ status }) => status === cardStatuses.SELECTED),
  },
  {
    status: "running",
    color: "#CA4554",
    label: boardColumsLabels[cardStatuses.RUNNING],
    Icon: SettingsIcon,
    cardsGetter: tasks => tasks.filter(({ status }) => status === cardStatuses.RUNNING),
  },
  {
    status: "evaluating",
    color: "#48A9F8",
    label: boardColumsLabels[cardStatuses.EVALUATING],
    Icon: QuestionIcon,
    cardsGetter: tasks => tasks.filter(({ status }) => status === cardStatuses.EVALUATING),
  },
  {
    status: "live",
    color: "#98CA5B",
    label: boardColumsLabels[cardStatuses.LIVE],
    Icon: CheckIcon,
    cardsGetter: tasks => tasks.filter(({ status }) => status === cardStatuses.LIVE),
  },
]
