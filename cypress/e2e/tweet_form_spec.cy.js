describe('Tweet投稿フォームのテスト', () => {
  beforeEach(() => {
    // テストの前にアプリケーションのページを訪問
    cy.visit('/');
  });

  it('投稿ページのフォームを正しく入力して送信すると、新しいTweetが作成される', () => {
    cy.contains('投稿する').click();
    cy.url().should('include', '/tweet/new');

    const userName = 'TestUser';
    const imageUrl = 'https://img.freepik.com/free-photo/cute-white-pomeranian-dog-on-a-chair_53876-138564.jpg';
    const title = 'This is a Dog tweet.';

    // 各入力フィールドを埋める
    cy.get('#user_name').type(userName);
    cy.get('#image').type(imageUrl);
    cy.get('#title').type(title);
    cy.get('form').submit();

    // 投稿後のトップページ遷移を確認
    cy.url().should('eq', 'http://localhost:8080/');
    cy.intercept('GET', 'http://localhost:5000/api/tweet').as('getTweets');
    // 投稿されたTweetがトップページに表示されていることを確認
    cy.contains(title).should('be.visible'); // 投稿されたタイトルがトップページに見えるかを確認
  });

  // ここに追加のテストケースを追加可能
});
