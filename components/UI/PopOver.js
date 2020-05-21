/**
 * Informational popover for physical activity level.
 * 
 * Uses React Bootstrap Popover to create an informational hover, OverlayTrigger
 * is the container for the information, and Button is the button to activate
 * the popover.
 * 
 * Popover, OverlayTrigger
 * @see https://react-bootstrap.github.io/components/overlays/#popovers
 * 
 * Button
 * @see https://react-bootstrap.github.io/components/buttons/
 */

import { Popover, OverlayTrigger, Button } from 'react-bootstrap'
import popoverStyles from '../../styles/PopOver.module.css'

const popover = (

  // Popover component from react-bootstrap
  <Popover id="popover-basic">
    <Popover.Title as="h3">Level of Physical Activity</Popover.Title>
    <Popover.Content>
      <ul className={popoverStyles.list}>
        <li><b>Sedentary</b> - Typical daily living activities</li>
        <li><b>Low Active</b> - Typical daily living activities + 30 - 60 min of daily moderate activity</li>
        <li><b>Active</b> - Typical daily living activities + At least 60 min of daily moderate activity</li>
        <li><b>Very Active</b> - Typical daily living activities + At least 60 min of daily moderate activity + an additional 60 min of vigorous activity or 120 min of moderate activity</li>
      </ul>
    </Popover.Content>
  </Popover>
);

const PopOver = () => (
  <>
    {/* OverlayTrigger component from react-bootstrap */}
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>

      {/* Button Component from react-bootstrap */}
      <Button className={popoverStyles.popoverButton} variant="success">?</Button>
    </OverlayTrigger>
  </>
);

export default PopOver