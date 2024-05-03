/**
 * Interface for the automations that are available.
 */
export interface Automation {
  /**
   * Unique identifier for the automation.
   */
  id: string;
  /**
   * Type of automation.
   */
  type: string;
  /**
   * Image to represent the automation.
   */
  image: string;
  /**
   * Title of the automation.
   */
  title: string;
  /**
   * Description of the automation.
   */
  description: string;
  /**
   * URL to learn more about the automation.
   */
  url: string;
}


export interface HiredAutomation extends Automation {
  enabled: boolean;
}


/**
 * Interface for the buttons that represent the automations in interface.
 */
export interface AutomationButton extends Automation {
  /**
   * represent if button is item is selected or not
   */
  isSelected: boolean;

  /**
   * path to the next step it needs to be unique for each automation
   */
  path: string;

  /**
   * represent if button is enabled or not
   */
  isEnabled: boolean;
}
