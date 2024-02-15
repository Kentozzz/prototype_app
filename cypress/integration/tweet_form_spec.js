describe('Tweet投稿フォームのテスト', () => {
  beforeEach(() => {
    // テストの前にアプリケーションのページを訪問
    cy.visit('/'); // ローカル開発環境のURLに合わせてください
  });

  it('フォームを正しく入力して送信すると、新しいTweetが作成される', () => {
    const userName = 'TestUser';
    const imageUrl = 'http://example.com/test-image.jpg';
    const title = 'This is a test tweet.';

    // 各入力フィールドを埋める
    cy.get('#user_name').type(userName);
    cy.get('#image').type(imageUrl);
    cy.get('#title').type(title);

    // フォームが送信されたときのAPIコールを模擬
    cy.intercept('POST', 'http://localhost:5000/api/tweet/create', {
      statusCode: 200,
      body: { success: true, message: 'Tweet successfully created' },
    }).as('createTweet');

    // 送信ボタンをクリック
    cy.get('form').submit();

    // APIリクエストの成功を確認
    cy.wait('@createTweet').its('response.statusCode').should('eq', 200);

    // 投稿後のページ遷移（例えば、ホームページへのリダイレクト）を確認
    // この部分は、アプリケーションの動作に基づいて調整してください
    cy.url().should('eq', 'http://localhost:8080/'); // 期待するURLに変更してください
  });

  // ここに追加のテストケースを記述...
});
