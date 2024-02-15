import { mount } from '@vue/test-utils';
import NewTweet from './NewTweet.vue'
import axios from 'axios';
jest.mock('axios'); // axios のモックを作成


describe("NewTweet.vue", () => {
  test('renders form elements correctly', () => {
    const wrapper = mount(NewTweet);
    expect(wrapper.find('#user_name').exists()).toBe(true);
    expect(wrapper.find('#image').exists()).toBe(true);
    expect(wrapper.find('#title').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });
  test('binds input values to data properties', async () => {
    const wrapper = mount(NewTweet);
    await wrapper.find('#user_name').setValue('test_user');
    await wrapper.find('#image').setValue('http://example.com/test.jpg');
    await wrapper.find('#title').setValue('Test Title');
  
    expect(wrapper.vm.tweet.user_name).toBe('test_user');
    expect(wrapper.vm.tweet.image).toBe('http://example.com/test.jpg');
    expect(wrapper.vm.tweet.title).toBe('Test Title');
  });
  test('フォーム送信時にAPIリクエストが正しく行われる', async () => {
    const wrapper = mount(NewTweet);

    await wrapper.find('#user_name').setValue('test_user');
    await wrapper.find('#image').setValue('http://example.com/test.jpg');
    await wrapper.find('#title').setValue('Test Title');
    await wrapper.find('form').trigger('submit.prevent');

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      user_name: 'test_user',
      image: 'http://example.com/test.jpg',
      title: 'Test Title'
    });
  });
})