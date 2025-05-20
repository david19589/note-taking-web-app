import { SVGProps, Ref, forwardRef } from "react"
const SvgComponent = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    ref={ref}
    {...props}
  >
    <path
      fill="#CACFD8"
      fillRule="evenodd"
      d="M5.658 6.348c.27-.27.708-.27.979 0l.876.876a.692.692 0 0 1-.98.979l-.875-.876a.692.692 0 0 1 0-.98Zm1.855 9.446c.27.27.27.709 0 .98l-1.589 1.589a.692.692 0 1 1-.98-.979l1.59-1.59c.27-.27.708-.27.979 0Zm7.592 0c.27-.27.709-.27.98 0l1.588 1.59a.692.692 0 1 1-.98.979l-1.588-1.59a.692.692 0 0 1 0-.979ZM11.308 4.583c.382 0 .692.31.692.693v.662a.692.692 0 1 1-1.384 0v-.662c0-.383.31-.692.692-.692ZM2.824 12c0-.382.31-.692.692-.692h1.731a.692.692 0 0 1 0 1.384H3.516A.692.692 0 0 1 2.824 12Zm13.852 0c0-.382.31-.692.693-.692h2.247a.692.692 0 0 1 0 1.384h-2.247a.692.692 0 0 1-.693-.692Zm-5.368 5.368c.382 0 .692.31.692.693v2.247a.692.692 0 1 1-1.384 0V18.06c0-.383.31-.693.692-.693Z"
      clipRule="evenodd"
    />
  </svg>
)
const StatusSvgDetailsDarkMode = forwardRef(SvgComponent)
export default StatusSvgDetailsDarkMode
