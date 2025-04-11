import { SVGProps, Ref, forwardRef } from "react"
const SvgComponent = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <path
      fill="#CACFD8"
      fillRule="evenodd"
      d="M15.75 20.414 7.336 12l8.414-8.414L17.164 5l-7 7 7 7-1.414 1.414Z"
      clipRule="evenodd"
    />
  </svg>
)
const ArrowLeftDetailsDarkMode = forwardRef(SvgComponent)
export default ArrowLeftDetailsDarkMode
