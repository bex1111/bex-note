import {mount} from '@vue/test-utils';
import Notification from './Notification.vue';
import {useToast} from "primevue/usetoast";
import {notificationStore} from "../main";

vi.mock('../main', () => ({
    notificationStore: {
        $subscribe: vi.fn()
    }
}));

vi.mock('primevue/usetoast', () => ({
    useToast: vi.fn()
}));

describe('Notification.vue', () => {


    const createWrapper = () => mount(Notification, {
        global: {
            stubs: {
                'prime-toast': true
            }
        }
    });

    it('matches snapshot', () => {
        const wrapper = createWrapper();
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('subscribes to notification store and calls toast.add when state changes', () => {
        let mockAdd = vi.fn();
        useToast.mockReturnValue({
            add: mockAdd
        });
        createWrapper();

        const subscribeCallback = notificationStore.$subscribe.mock.calls[0][0];

        const mockMutation = {};
        const mockState = {
            type: 'success',
            message: 'Note saved successfully'
        };

        subscribeCallback(mockMutation, mockState);

        expect(useToast).toHaveBeenCalledTimes(1);
        expect(mockAdd).toHaveBeenCalledTimes(1);
        expect(mockAdd).toHaveBeenCalledWith({
            severity: mockState.type,
            summary: mockState.message,
            life: 5000
        });
    });
});
