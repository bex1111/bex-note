import {mount} from '@vue/test-utils';
import Loader from './Loader.vue';
import {nextTick} from 'vue';
import {loadStore} from '../main';


vi.mock('../main', () => ({
    loadStore: {
        loading: false,
        $subscribe: vi.fn()
    }
}));

describe('Loader.vue', () => {
    const createWrapper = () => mount(Loader, {
        global: {
            stubs: {
                'prime-progress-spinner': true
            }
        }
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('matches snapshot (loader hidden when loading=false)', () => {
        const wrapper = createWrapper();
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('subscribes to load store and shows loader when loading becomes true', async () => {
        const wrapper = createWrapper();

        const subscribeCallback = loadStore.$subscribe.mock.calls[0][0];

        const mockState = {loading: true};
        subscribeCallback({}, mockState);
        await nextTick();

        expect(loadStore.$subscribe).toHaveBeenCalledTimes(1);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('remains hidden when loading stays false', async () => {
        const wrapper = createWrapper();
        const subscribeCallback = loadStore.$subscribe.mock.calls[0][0];
        const mockState = {loading: false};
        subscribeCallback({}, mockState);
        await nextTick();
        expect(loadStore.$subscribe).toHaveBeenCalledTimes(1);
        expect(wrapper.html()).toMatchSnapshot();
    });
});

