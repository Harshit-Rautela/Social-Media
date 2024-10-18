#include<bits/stdc++.h>
using namespace std;

int pathWithMinEff(vector<vector<int>> heights ){
   int n = heights.size();
   int m = heights[0].size();
   priority_queue<pair<int, pair<int, int>>,
                       vector<pair<int, pair<int, int>>>,
                       greater<pair<int, pair<int, int>>>>
            pq;
    
    vector<vector<int>> parent(n, vector<int>(m, -1));
    pq.push({0,{n-1,m-1}});
    bool reached_start=false;
    parent[n-1][m-1] = heights[n-1][m-1];
    while(!pq.empty() && !reached_start){
        int dist = pq.top().first;
        int row = pq.top().second.first;
        int col = pq.top().second.second;
        pq.pop();     
        int delRow[] = {1, 0, -1, 0};
        int delCol[] = {0, 1, 0, -1};
        for(int i=0;i<4;i++){
            int nrow = row+delRow[i];
            int ncol = col+delCol[i];
            if(nrow>=0 && nrow<n && ncol>=0 && ncol<m && parent[nrow][ncol] == -1){
                int diff = abs(heights[row][col]- heights[nrow][ncol]);
                pq.push({diff,{nrow,ncol}});
                parent[nrow][ncol] = heights[nrow][ncol];
                if(nrow==0 && ncol==0){
                    reached_start =true;
                    break;
                }
            }
        }
    }
    vector<int> ans;     
    int delRow[] = {1, 0, -1, 0};
    int delCol[] = {0, 1, 0, -1};
    int row = 0,col=0;
    while(row!=n-1 && col !=m-1){
         for(int i=0;i<4;i++){
          int nrow = row+delRow[i];
          int ncol = col+delCol[i];
           if(nrow>=0 && nrow<n && ncol>=0 && ncol<m && parent[nrow][ncol] != -1){
            ans.push_back(parent[nrow][ncol]);
            row=nrow;
            col = ncol;
            break;
          }
        }
    }
    int minDiff = 0;
    for(int i=0 ;i<ans.size()-1;i++){
        if(abs(ans[i]-ans[i+1])<minDiff){
           minDiff = abs(ans[i]-ans[i+1]);
        }
        
    }
    return minDiff;

}

int main(){
    return 0;
}