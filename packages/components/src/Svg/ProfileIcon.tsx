import React from "react"
import Icon from "@ant-design/icons"

const Profile = () => {
  return (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      x="0px"
      y="0px"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <g>
        <g transform="translate(0.000000,550.000000) scale(0.100000,-0.100000)">
          <path d="M4724,5002.9c-277-29.1-678.1-147.2-929.9-273.2c-759.5-381.7-1276.7-1053.9-1466.6-1906.4c-63.9-290.6-63.9-790.4,0-1081C2500,967.4,2964.9,337.7,3656.6-67.2c93-54.3,143.4-93,125.9-98.8c-15.5-5.8-131.7-46.5-259.6-91.1C2478.6-611.6,1535.2-1394.3,1012.1-2337.8c-300.3-542.5-484.3-1139.2-542.5-1757.2c-29.1-315.8-19.4-482.4,32.9-552.1C642-4837,882.3-4837,1019.8-4649c32.9,44.6,42.6,98.8,56.2,329.4c36.8,637.4,176.3,1154.7,451.4,1677.7C2129.9-1500.8,3261.3-725.9,4540-576.7c1865.7,217,3601.6-885.4,4192.5-2661.9c129.8-389.4,176.3-660.6,211.2-1245.7c19.4-313.9,375.9-416.5,563.8-162.7c36.8,50.4,40.7,79.4,38.8,319.7c-9.7,1044.2-463,2105.9-1238,2908C7804.5-900.2,7149.6-479.8,6487-255.1c-127.9,42.6-244.1,83.3-259.6,89.1c-17.4,5.8,32.9,44.6,125.9,98.8C7054.7,341.6,7535.1,1010,7692.1,1792.7c50.4,255.7,46.5,765.3-9.7,1026.8c-232.5,1083-1017.1,1879.2-2096.2,2129.2C5384.7,4995.1,4925.5,5024.2,4724,5002.9z M5440.9,4348.1c811.8-174.4,1416.2-771.1,1621.6-1596.4c50.4-201.5,60-672.3,19.4-866c-94.9-434-275.1-778.8-565.7-1083C5688.8-57.5,4323-59.4,3497.7,798.8c-298.4,311.9-476.6,652.9-569.6,1086.9c-32.9,156.9-31,625.8,1.9,794.3c83.3,416.5,286.7,800.1,581.2,1096.5c302.2,300.3,709.1,513.4,1106.2,579.3c79.4,11.6,158.9,25.2,174.4,29.1C4859.7,4402.3,5316.9,4375.2,5440.9,4348.1z" />
        </g>
      </g>
    </svg>
  )
}

export const ProfileIcon = (props: { alt?: string }) => {
  return <Icon alt={props.alt} aria-label="Profile Icon Image" component={Profile} />
}
