import { TabsPage } from './tabs/tabs';
import { SellPage } from './sell/sell';
import { BuyPage } from './buy/buy';
import { MessagePage } from './message/message';
import { ProfilePage } from './profile/profile';


// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = TabsPage;

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = SellPage;
export const Tab2Root = BuyPage;
export const Tab3Root = MessagePage;
export const Tab4Root = ProfilePage;
